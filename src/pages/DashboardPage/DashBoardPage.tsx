/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useMemo, useState } from 'react';
// TODO: will be removed when the PDF feature is implemented
// import { PDFViewer } from '@react-pdf/renderer';
// import { subDays, format } from 'date-fns';
// import PDFfile from './components/PDFfile/PDFfile';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import ProjectNavigationV3 from '../../lib/ProjectNavigationV3/ProjectNavigationV3';
import ValueCard from './components/ValueCard/ValueCard';
import styles from './DashBoardPage.module.scss';
import useFetchDashboardData from './hooks/useFetchDashboardData';
import ChartCard, { ChartType } from './components/ChartCard/ChartCard';
import { convertProgressData } from './utils';

import {
  // TODO: will be fixed when the DailyReport
  // getDailyReport,
  getPDFReportContent,
  getStatusSummaryBySprint
} from '../../api/dashboard/dashboard';
import { getCurrentSprints } from '../../api/sprint/sprint';

interface IValueCard {
  title: string;
  value: number | string;
}

interface ILineChartData {
  data: ReadonlyArray<object>;
  dataKeyList: string[];
}

interface IBarChartData {
  dataKeyList: string[];
  data: { name: string; count: number }[];
}

function DashBoardPage() {
  const { data, isLoading } = useFetchDashboardData();
  const { projectId } = useParams();
  const [PDFcontent, setPDFcontent] = useState<string>('');
  const [isPDFLoading, setIsPDFLoading] = useState<boolean>(false);
  const [isShowPDF, setIsShowPDF] = useState<boolean>(false);
  const [chartBase64String, setChartBase64String] = useState<string>('');
  const [dailyReport, setDailyReport] = useState<any>([]);
  const [pieChartData, setPieChartData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    // TODO: will be fixed when the DailyReport feature is implemented
    // const loadDailyReport = async () => {
    //   if (!projectId) return;
    //   const result = await getDailyReport(
    //     projectId,
    //     format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    //     '6678cd0bc8dde03b2169871a'
    //   );
    //   setDailyReport(result);
    // };
    // loadDailyReport();
    const loadStatusSummary = async () => {
      if (!projectId) return;
      try {
        const sprintList = await getCurrentSprints(projectId);

        const sprint = Array.isArray(sprintList) ? sprintList[0] : sprintList;

        // eslint-disable-next-line no-underscore-dangle
        const sprintId = sprint?.id || sprint?._id;

        if (!sprintId) {
          return;
        }

        const result = await getStatusSummaryBySprint(projectId);

        setPieChartData(result);
      } catch (err) {
        toast.error('Failed to load sprint status summary', { theme: 'colored' });
      }
    };

    loadStatusSummary();
  }, [projectId]);

  const valueCardList: IValueCard[] = useMemo(() => {
    if (!data) return [];

    const { ticketCount, dailyScrumCount } = data;
    const { total: totalDailyScrum, isCanFinish } = dailyScrumCount;
    const { total: totalTicket, toDo, inProgress, done, review } = ticketCount;

    const valueCardListData: IValueCard[] = [
      {
        title: 'Total issues',
        value: totalTicket
      },
      {
        title: 'issues need support',
        value: dailyScrumCount?.isNeedSupport?.total
      },
      {
        title: 'Delayed issues',
        value: totalDailyScrum - isCanFinish
      },
      {
        title: 'Current progress',
        // To do stands for 0%, in progress stands for 70%, preview stands for 80%, done stands for 100%
        // avoid using toFixed() to keep the type of number
        value: `${(
          ((toDo * 0 + inProgress * 0.7 + review * 0.8 + done * 1) / totalTicket) *
          100
        ).toFixed(1)}%`
      }
    ];

    return valueCardListData;
  }, [data]);

  const lineChartData = useMemo((): ILineChartData => {
    if (!data) return { data: [], dataKeyList: [] };
    return {
      dataKeyList: data?.dailyScrums?.map((dailyScrum) => dailyScrum?.title),
      data: convertProgressData(
        data?.dailyScrums.map(({ title, progresses }) => ({
          title,
          progresses: progresses.map(({ timeStamp, value }) => ({
            timeStamp,
            value
          }))
        }))
      )
    };
  }, [data]);

  const barChartData = useMemo((): IBarChartData => {
    if (!data) return { data: [], dataKeyList: [] };
    const { ticketCount } = data;
    const modifiedData = Object.entries(ticketCount).filter(([key]) => key !== 'total');

    return {
      dataKeyList: modifiedData.map(([key]) => key),
      data: modifiedData.map(([key, value]) => ({
        name: key?.toUpperCase(),
        count: value
      }))
    };
  }, [data]);

  const generatePDFPreview = async () => {
    try {
      setIsPDFLoading(true);
      const res = await getPDFReportContent(projectId as string);
      setIsPDFLoading(false);
      setIsShowPDF(true);
      setPDFcontent(res?.content);
    } catch (error) {
      toast('Something went wrong when generating PDF!', {
        theme: 'colored',
        toastId: 'PDF error'
      });
      setIsShowPDF(false);
      setIsPDFLoading(false);
    }
  };

  const closePDFPreview = () => {
    setIsShowPDF(false);
    setChartBase64String('');
  };

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.header}>Dashboard</h1>
      <ProjectNavigationV3 />

      {!isLoading ? (
        <>
          <div className={styles.dashboardWrapper}>
            <h2>Actions</h2>
            {dailyReport.map((item) => (
              <p key={item} style={{ margin: '10px 0' }}>
                {item}
              </p>
            ))}
          </div>
          <div className={styles.dashboardWrapper}>
            <div className={styles.header}>
              <h2>Sprint number</h2>
              <div className={styles.PDFbtnControl}>
                {isShowPDF ? (
                  <button type="button" className={styles.closePDFbtn} onClick={closePDFPreview}>
                    Close Preview
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.exportPDFbtn}
                    onClick={generatePDFPreview}
                  >
                    Preview PDF
                  </button>
                )}
              </div>
            </div>
            {isPDFLoading ? <Loading /> : null}
            {/* {isShowPDF ? (
              <PDFViewer width="100%" height="800px">
                <PDFfile
                  project={currentProject}
                  content={PDFcontent}
                  chartBase64String={chartBase64String}
                />
              </PDFViewer>
            ) : null} */}
            <div className={styles.dashboardGridLayout}>
              {valueCardList.map(({ title, value }, index) => (
                <ValueCard key={uuidv4()} title={title} value={value} />
              ))}

              <ChartCard
                type={ChartType.PIE_CHART}
                data={pieChartData}
                setChartBase64String={() => {}}
              />
              <ChartCard
                data={lineChartData?.data}
                dataKeyList={lineChartData?.dataKeyList}
                type={ChartType.LINE_CHART}
                setChartBase64String={setChartBase64String}
                isShowPDF={isShowPDF}
              />
              <ChartCard
                data={barChartData?.data}
                type={ChartType.BAR_CHART}
                setChartBase64String={setChartBase64String}
              />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default DashBoardPage;
