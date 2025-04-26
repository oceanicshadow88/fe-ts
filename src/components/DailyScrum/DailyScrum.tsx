/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { DatePicker } from '@atlaskit/datetime-picker';
import { differenceInDays, format } from 'date-fns';
import styles from './DailyScrum.module.scss';
import { getDailyData, getDailyOptions, upsertDailyScrum } from '../../api/dailyScrum/dailyScrum';
import { UserContext } from '../../context/UserInfoProvider';
import Modal from '../../lib/Modal/Modal';
import { dateFormatter } from '../../utils/helpers';
import { IUserInfo, IDailyScrumTicket } from '../../types';
import RadioGroup from '../../lib/FormV2/RadioGroup/RadioGroup';
import CheckBox from '../../lib/FormV2/CheckBox/CheckBox';
import { getLatestSprint } from '../../api/sprint/sprint';
import DropdownV2 from '../../lib/FormV2/DropdownV2/DropdownV2';

interface IDailyScrumModal {
  onClickCloseModal: () => void;
  projectId: string;
}

// id is required but any other properties of IDailyScrumTicket are optional
type IDailyScrumTicketUpdate = Partial<IDailyScrumTicket> & { id: string };

enum DailyScrumTicketsActionType {
  UPDATE_ONE_TICKET = 'UPDATE_ONE_TICKET',
  GET_ALL_TICKETS = 'GET_ALL_TICKET'
}

interface IDailyScrumTicketsAction {
  type: DailyScrumTicketsActionType;
  payload: IDailyScrumTicketUpdate | IDailyScrumTicket[];
}

const initialDailyScrumTickets: IDailyScrumTicket[] = [];

const dailyScrumTicketsReducer = (state: IDailyScrumTicket[], action: IDailyScrumTicketsAction) => {
  switch (action.type) {
    case DailyScrumTicketsActionType.GET_ALL_TICKETS:
      return [...state, ...(action.payload as IDailyScrumTicket[])];

    case DailyScrumTicketsActionType.UPDATE_ONE_TICKET:
      return state.map((ticket: IDailyScrumTicket) =>
        ticket.id === (action.payload as IDailyScrumTicketUpdate).id
          ? { ...ticket, ...action.payload }
          : { ...ticket }
      );

    default:
      return [...state];
  }
};

function DailyScrum({ onClickCloseModal, projectId }: IDailyScrumModal): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dailyOptions, setDailyOptions] = useState<any>();
  const [formData, setFormData] = useState<any>({
    date: format(new Date(), 'yyyy-MM-dd'),
    progress: ''
  });
  const [formReasons, setFormReasons] = useState<any>({});
  const [currentSprints, setCurrentSprints] = useState<any>();
  const [selectedSprint, setSelectedSprint] = useState<any>();
  const [dailyScrumTickets] = useReducer(dailyScrumTicketsReducer, initialDailyScrumTickets);

  const { id: userId }: IUserInfo = useContext(UserContext);

  useEffect(() => {
    async function latestSprints() {
      const res = await getLatestSprint(projectId).catch(() => {
        toast.error('Failed to get dailyScrum data!', {
          theme: 'colored',
          toastId: 'dailyScrum error'
        });
      });
      setCurrentSprints(res);
      setSelectedSprint({
        label: res[0].name,
        value: res[0]._id
      });
    }
    async function loadDailyOptions() {
      const res: any = await getDailyOptions();
      setDailyOptions(res);
    }
    loadDailyOptions();
    latestSprints();
  }, [projectId]);

  useEffect(() => {
    async function loadDailyData(date: any) {
      if (!formData.date || !selectedSprint) {
        return;
      }
      const res: any = await getDailyData(
        projectId,
        date,
        selectedSprint.value,
        '6678cd0bc8dde03b2169871a',
        userId ?? ''
      );
      setFormData({
        ...formData,
        support: dailyOptions.questions.support.options.find(
          (item) => item.value === res?.needSupport?.toString()
        ),
        progress: dailyOptions.questions.progress.options.find(
          (item) => item.value === res?.canCompleteSprint?.toString()
        )
      });
      if (!res?.feedback) return;
      setFormReasons(JSON.parse(res.feedback));
    }
    if (!dailyOptions) {
      return;
    }
    loadDailyData(formData.date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.date, dailyOptions, selectedSprint]);

  const CURRENT_DATE = selectedSprint?.startDate;
  const SPRINT_END_DATE = selectedSprint?.endDate;

  const onHandleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await upsertDailyScrum(projectId, {
      reportDate: formData.date,
      needSupport: formData.support.value,
      canCompleteSprint: formData.progress.value,
      sprintId: selectedSprint.value,
      tenantId: '6678cd0bc8dde03b2169871a',
      accessKey: userId ?? '',
      feedback: formData.progress.value === 'true' ? '' : JSON.stringify(formReasons)
    });
    setIsSubmitting(false);
    onClickCloseModal();
  };

  const onDefaultChange = (e: any) => {
    setFormData({ ...formData, ...{ [e.target.name]: e.target.value } });
  };

  const onDefaultChangeReason = (e: any) => {
    setFormReasons({ ...formReasons, ...{ [e.target.name]: e.target.value } });
  };

  const onChangeDate = (value: any) => {
    setFormData({ ...formData, ...{ date: value } });
  };

  const renderQuestions = () => {
    if (!dailyOptions || !dailyOptions?.questions) {
      return <></>;
    }
    return Object.entries(dailyOptions.questions).map(([name, config]: any) => (
      <div key={name}>
        <p className="mt-5">{config.text}</p>
        <RadioGroup
          name={name}
          options={config.options}
          onChange={onDefaultChange}
          selected={formData[name]?.value}
        />
      </div>
    ));
  };

  const renderReasons = () => {
    if (!dailyOptions || !dailyOptions?.reasons) {
      return <></>;
    }

    const shouldShowReasons = Object.entries(dailyOptions.reasonsDep).some(
      ([field, value]) => formData[field]?.value === value
    );

    if (!shouldShowReasons) return null;

    return Object.entries(dailyOptions.reasons).map(([name, config]: any) => (
      <CheckBox
        key={name}
        label={config.label}
        checked={formReasons[name]}
        onChange={onDefaultChangeReason}
        name={name}
      />
    ));
  };
  if (!currentSprints) {
    return <></>;
  }
  return (
    <div className={styles.dailyScrumContainer}>
      <div className={styles.dailyScrumHeader}>
        <h2 data-testid="dailyscrum-header">Daily Log</h2>
        <button
          className={styles.closeBtn}
          onClick={onClickCloseModal}
          data-testid="dailyscrum-close"
        >
          <AiOutlineClose />
        </button>
      </div>
      <form onSubmit={onHandleSubmit}>
        <div className={styles.dailyScrumContent}>
          <div>
            <p>A short summary for your progress</p>
            <DropdownV2
              options={currentSprints.map((item) => {
                return {
                  label: item.name,
                  value: item._id
                };
              })}
              label="Current Sprint"
              name="currentSprint"
              onValueChanged={(e) => {
                setSelectedSprint(e);
              }}
              value={selectedSprint.value}
            />

            <h4 style={{ marginTop: '20px' }}>
              Sprint Ends: <span>{dateFormatter(SPRINT_END_DATE)}</span>
            </h4>

            <p data-testid="dailyscrum-total-number-of-ticktes" style={{ marginTop: '5px' }}>
              Sprint ends in:
              <span className={styles.dayDiffText}>
                {differenceInDays(SPRINT_END_DATE, CURRENT_DATE)} days
              </span>
            </p>
            <p data-testid="dailyscrum-total-number-of-ticktes" style={{ marginTop: '5px' }}>
              You currently have {dailyScrumTickets.length} ticket(s) left
            </p>
            <p data-testid="dailyscrum-total-number-of-ticktes" style={{ margin: '5px 0' }}>
              Report Date
            </p>
            <DatePicker value={formData.date} testId="calendar" onChange={onChangeDate} />
            <hr className={styles.hr} />
            <h3 data-testid="dailyscrum-header">Anonymous Feedback</h3>
            <p>To ensure comfort, feedback will remain anonymous</p>

            {renderQuestions()}
            {renderReasons()}
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button
            className={styles.cancelBtn}
            type="button"
            onClick={onClickCloseModal}
            data-testid="dailyscrum-cancel"
          >
            Cancel
          </button>
          <input
            className={styles.submitBtn}
            disabled={isSubmitting}
            type="submit"
            data-testid="dailyscrum-submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
}

interface IDailyScrum {
  onClickCloseModal: () => void;
  projectId: string;
}
export default function DailyScrumModal({ onClickCloseModal, projectId }: IDailyScrum) {
  return (
    <>
      {ReactDOM.createPortal(
        <Modal classesName={styles.dailyScrumModal}>
          <DailyScrum onClickCloseModal={onClickCloseModal} projectId={projectId} />
        </Modal>,
        document.getElementById('root') as Element
      )}
    </>
  );
}
