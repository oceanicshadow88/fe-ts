import { v4 as uuidv4 } from 'uuid';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Legend,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  Label
} from 'recharts';
import { useCurrentPng } from 'recharts-to-png';
import { toast } from 'react-toastify';
import { IUserInfo } from '../../../../types';
import styles from './ChartCard.module.scss';
import { UserContext } from '../../../../context/UserInfoProvider';
import { useFetchDashboardDailyScrumsByUser } from '../../hooks/useFetchDashboardData';
import { getUsers } from '../../../../api/user/user';
import { convertProgressData } from '../../utils';
import { pickCartoonCategoryColor } from './utils/colorUtils';

type Props = {
  data?: any;
  dataKeyList?: string[];
  type: ChartType;
  style?: React.CSSProperties;
  setChartBase64String: (base64: string) => void;
  isShowPDF?: boolean;
};

export enum ChartType {
  EPIC_BAR_CHART = 'epicBarChart',
  LINE_CHART = 'lineChart',
  PIE_CHART = 'pieChart'
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function lineChart(data: any, ref: React.MutableRefObject<any>, dataKeyList: string[] = []) {
  return (
    <div className={`${styles.chartArea} ${styles['chartArea--line']}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          ref={ref}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeyList.map((dataKey) => {
            return (
              <Line
                type="monotone"
                key={uuidv4()}
                dataKey={dataKey}
                stroke={getRandomHexColor()}
                activeDot={{ r: 8 }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function epicBarChart(
  data: { name: string; [status: string]: string | number }[],
  statusKeys: string[]
) {
  return (
    <>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Epic progress</h3>
        <p className={styles.chartSubtitle}>See how your epics are progressing at a glance.</p>
      </div>

      <div className={`${styles.chartArea} ${styles['chartArea--bar']}`}>
        <ResponsiveContainer width="100%" height={30 * data.length + 70}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={25}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend verticalAlign="top" />
            {statusKeys.map((key, barIdx) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={pickCartoonCategoryColor(barIdx)}
                name={key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

function pieChart(data: { name: string; value: number }[]) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderCustomLegend = (props: any): React.ReactNode => {
    const { payload } = props;

    return (
      <ul className={styles.legend}>
        {payload?.map((entry: any) => {
          const maybe = entry.payload;

          if (typeof maybe === 'object' && maybe !== null && 'name' in maybe && 'value' in maybe) {
            const pieChartData = maybe as { name: string; value: number };

            return (
              <li key={pieChartData.name} className={styles.legend__item}>
                <div className={styles.legend__color} style={{ backgroundColor: entry.color }} />
                <div className={styles.legend__text}>
                  <span className={styles.legendLabel}>{pieChartData.name}</span>
                  <span className={styles.legendValue}>: {pieChartData.value}</span>
                </div>
              </li>
            );
          }

          return null;
        })}
      </ul>
    );
  };

  return (
    <>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Status overview</h3>
        <p className={styles.chartSubtitle}>Get a snapshot of the status of your work items.</p>
      </div>
      <div className={styles.chartContent}>
        <div className={`${styles.chartArea} ${styles['chartArea--pie']}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={110}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={pickCartoonCategoryColor(index)} />
                ))}
                <Label
                  value="Total work items"
                  position="center"
                  className={styles.pieCenterLabel}
                  dy={-10}
                />
                <Label value={total} position="center" className={styles.pieCenterValue} dy={10} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.legendWrapper}>
          {renderCustomLegend({
            payload: data.map((d, i) => ({
              color: pickCartoonCategoryColor(i),
              payload: d
            }))
          })}
        </div>
      </div>
    </>
  );
}

function ChartCard({ style, dataKeyList, data, type, setChartBase64String, isShowPDF }: Props) {
  const { id: initialId } = useContext(UserContext);
  const [chartData, setChartData] = useState(data);
  const [chartDataKeyList, setDataKeyList] = useState(dataKeyList ?? []);
  const [currentUserId, setCurrentUserId] = useState(initialId);
  const [users, setUsers] = useState<IUserInfo[]>([]);
  const [getLinePng, { ref: lineRef }] = useCurrentPng();

  useEffect(() => {
    (async () => {
      const res = await getUsers();
      setUsers(res.data);
    })();
  }, []);

  const rawData = useFetchDashboardDailyScrumsByUser(currentUserId as string);

  const newData = useMemo(() => {
    if (!rawData) {
      return null;
    }
    return {
      dataKeyList: rawData?.map(({ title }) => title),
      data: convertProgressData(
        rawData?.map(({ title, progresses }) => ({
          title,
          progresses: progresses?.map(({ timeStamp, value }) => ({
            timeStamp,
            value
          }))
        }))
      )
    };
  }, [rawData]);

  useEffect(() => {
    if (!newData) return;
    if (type === ChartType.LINE_CHART) {
      setChartData(newData.data);
      setDataKeyList(newData.dataKeyList);
    }
  }, [newData, type]);

  const handleChartPNGGeneration = async () => {
    const png = await getLinePng();
    if (!png) {
      toast.error('Please wait for the chart to load', {
        theme: 'colored',
        toastId: 'pdf-download-error'
      });
      return;
    }
    const base64 = png.split(',')[1]; // remove the data:image/png;base64, part
    setChartBase64String(base64);
  };

  const showUserSelector = type === ChartType.LINE_CHART;

  return (
    <div style={{ ...style }} className={styles.chartCardWrapper}>
      {type === ChartType.LINE_CHART && (
        <button
          onClick={handleChartPNGGeneration}
          className={styles.addToPdfBtn}
          disabled={!isShowPDF}
        >
          Add this chart to PDF
        </button>
      )}

      {type === ChartType.LINE_CHART && lineChart(chartData, lineRef, chartDataKeyList)}
      {type === ChartType.EPIC_BAR_CHART && epicBarChart(chartData, chartDataKeyList)}
      {type === ChartType.PIE_CHART && pieChart(chartData)}

      {showUserSelector && users.length > 0 && (
        <div className={styles.controlBar}>
          <select
            name="dashboard-user-select"
            id="dashboard-user-select"
            defaultValue={initialId ?? ''}
            onChange={(e) => setCurrentUserId(e.target.value)}
          >
            {users.map(({ name, id }) => (
              <option key={id} value={id ?? ''}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

ChartCard.defaultProps = {
  style: {},
  data: [],
  dataKeyList: [],
  isShowPDF: false
};

export default React.memo(ChartCard);
