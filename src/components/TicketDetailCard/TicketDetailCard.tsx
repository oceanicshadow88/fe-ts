import React, { useEffect, useState, useContext } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiLabel } from 'react-icons/bi';
import { GoPeople, GoTag } from 'react-icons/go';
import { IoPersonOutline } from 'react-icons/io5';
import { MdOutlineCategory } from 'react-icons/md';
import { RiFlag2Line } from 'react-icons/ri';
import styles from './TicketDetailCard.module.scss';
import { ILabelData, IStatus, ITicketDetails, IUserInfo } from '../../types';
import useOutsideAlerter from '../../hooks/OutsideAlerter';
import { showTicket } from '../../api/ticket/ticket';
import { ProjectDetailsContext } from '../../context/ProjectDetailsProvider';
import { ModalContext } from '../../context/ModalProvider';
import { UserContext } from '../../context/UserInfoProvider';
import TicketTypeDropDown from './@components/TicketTypeDropDown/TicketTypeDropDown';
import { Tabs, TabLabel, TabPanel } from '../Tabs/Tabs';
import ActivitiesSession from './@components/ActivitiesSession/ActivitiesSession';
import CommentsSession from './@components/CommentsSession/CommentsSession';
import DescriptionSession from './@components/DescriptionSession/DescriptionSession';
import DueDatePicker from '../Form/DueDatePicker/DueDatePicker';
import TicketPriorityDropDown from './@components/TicketPriorityDropDown/TicketPriorityDropDown';
import TicketStatusDropDown, {
  IOption
} from './@components/TicketsStatusDropDown/TicketsStatusDropDown';
import UsersDropDown from './@components/UsersDropDown/UsersDropDown';
import LabelDropDownV2 from './@components/LabelsDropdown/LabelsDropDownV2';
import checkAccess from '../../utils/helpers';
import { Permission } from '../../utils/permission';
import SVGPaths from '../../assets/ticketDetailCard/ticketDetailCardSvgPath';

interface ITicketDetailCardProps {
  ticketId: string;
  onDeletedTicket: (id: string) => void;
  onSavedTicket: (data: any) => void;
  projectId: string;
  isReadOnly: boolean;
}

function TicketDetailCard({
  ticketId,
  onDeletedTicket,
  onSavedTicket,
  projectId,
  isReadOnly
}: ITicketDetailCardProps) {
  const [ticketInfo, setTicketInfo] = useState<ITicketDetails | null>(null);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const [editTitle, setEditTitle] = useState(false);
  const { closeModal } = useContext(ModalContext);
  const userInfo = useContext(UserContext);
  const projectDetails = useContext(ProjectDetailsContext);
  const { users, ticketTypes, statuses } = projectDetails;

  useEffect(() => {
    if (!ticketId) {
      return;
    }
    const fetchTicketDetails = async () => {
      const res = await showTicket(ticketId);
      setTicketInfo(res.data);
    };

    fetchTicketDetails();
  }, [ticketId]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    (e.target as HTMLInputElement).blur();
    setEditTitle(false);
  };

  const handleTitleInputBlur = () => {
    onSavedTicket(ticketInfo);
    setEditTitle(false);
  };

  const onDefaultChange = async (fieldName: string, value: any, save = true) => {
    if (!ticketInfo) return;
    const updatedTicketInfo = { ...ticketInfo, [fieldName]: value };
    if (save) {
      await onSavedTicket(updatedTicketInfo);
    }
    setTicketInfo(updatedTicketInfo);
  };

  const onDefaultSubmit = async (data: any) => {
    const updatedTicketInfo = { ...ticketInfo, ...data };
    await onSavedTicket(updatedTicketInfo);
    setTicketInfo(updatedTicketInfo);
  };

  if (!ticketInfo) {
    return <div />;
  }

  const renderHeader = () => {
    return (
      <header className={styles.ticketHeader}>
        <div className={styles.ticketTypeSection}>
          <TicketTypeDropDown
            value={ticketInfo?.type}
            ticketTypes={ticketTypes}
            onChange={onDefaultChange}
            isDisabled={isReadOnly}
          />
          <span>{`${ticketInfo?.id}`}</span>
        </div>
        <div className={styles.actionMenu}>
          <div className={styles.deleteSession} ref={myRef}>
            <button onClick={() => setVisible(!visible)} type="button">
              <img src={SVGPaths.kebabMenuIcon} alt="" />
            </button>
            {visible && checkAccess(Permission.DeleteTickets, projectId) && (
              <div className={styles.dropdownContainer}>
                <button
                  onClick={() => {
                    closeModal('ticketDetailCard');
                    onDeletedTicket(ticketId);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <button type="button" onClick={() => closeModal('ticketDetailCard')}>
            <img src={SVGPaths.closeIcon} alt="" />
          </button>
        </div>
      </header>
    );
  };

  const renderDetails = () => {
    const tagItems = [
      { icon: BiLabel, text: 'Type' },
      { icon: MdOutlineCategory, text: 'Status' },
      { icon: AiOutlineCalendar, text: 'Due Date' },
      { icon: RiFlag2Line, text: 'Priority' },
      { icon: GoPeople, text: 'Reporter' },
      { icon: IoPersonOutline, text: 'Assignee' },
      { icon: GoTag, text: 'Label' }
    ];

    const options: IOption[] = statuses.map((item: IStatus) => ({
      id: item.id,
      name: item.name
    }));

    return (
      <div className={styles.ticketDetailsContent}>
        {tagItems.map((item) => (
          <div className={styles.ticketDetailTagItem} key={item.text}>
            <item.icon className={styles.reactIcon} />
            <p>{item.text}</p>
          </div>
        ))}

        <div className={styles.ticketDetailInfoItem}>
          <TicketTypeDropDown
            value={ticketInfo?.type}
            ticketTypes={ticketTypes}
            showButtonText
            onChange={(fieldName: string, value: any) => {
              onDefaultChange(fieldName, value);
            }}
            isDisabled={isReadOnly}
          />
        </div>

        <div className={styles.ticketDetailInfoItem}>
          <TicketStatusDropDown
            value={ticketInfo?.status}
            options={options}
            onChange={(value: string) => {
              onDefaultChange('status', value);
            }}
            isDisabled={isReadOnly}
          />
        </div>

        <DueDatePicker
          ticketInfo={ticketInfo}
          dueDateOnchange={(updatedTicketInfo: ITicketDetails) => {
            onDefaultChange('dueAt', updatedTicketInfo.dueAt);
          }}
          isDisabled={isReadOnly}
        />

        <div className={styles.ticketDetailInfoItem}>
          <TicketPriorityDropDown
            priority={ticketInfo.priority}
            onChange={(value: string) => {
              onDefaultChange('priority', value);
            }}
            isDisabled={isReadOnly}
          />
        </div>

        <div className={styles.ticketDetailInfoItem}>
          <UsersDropDown
            value={ticketInfo.reporter}
            users={users}
            onChange={(value: IUserInfo | undefined) => {
              onDefaultChange('reporter', value);
            }}
            dataTestId="reporter"
          />
        </div>

        <div className={styles.ticketDetailInfoItem}>
          <UsersDropDown
            value={ticketInfo.assign}
            users={users}
            onChange={(value: IUserInfo | undefined) => {
              onDefaultChange('assign', value);
            }}
            dataTestId="assign"
          />
        </div>

        <LabelDropDownV2
          ticketLabels={ticketInfo.labels || []}
          ticketId={ticketInfo.id}
          projectId={ticketInfo.project.id}
          onTicketLabelsChange={(value: ILabelData[]) => {
            onDefaultChange('labels', value);
          }}
          dataTestId="labels"
          isDisabled={isReadOnly}
        />
      </div>
    );
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {renderHeader()}
        <div className={styles.ticketTitleContainer}>
          {editTitle ? (
            <input
              type="text"
              value={ticketInfo.title}
              onKeyDown={handleKeyPress}
              onBlur={handleTitleInputBlur}
              onChange={(e) => {
                onDefaultChange('title', e.target.value, false);
              }}
            />
          ) : (
            <button
              data-testid="ticket-detail-title"
              onClick={() => {
                if (isReadOnly) return;
                setEditTitle(true);
              }}
            >
              {ticketInfo.title}
            </button>
          )}
        </div>

        <div className={styles.ticketDetailsSession}>{renderDetails()}</div>
        <DescriptionSession
          description={ticketInfo.description}
          attachmentUrls={ticketInfo.attachmentUrls}
          onSubmitForm={onDefaultSubmit}
          users={users}
          isDisabled={isReadOnly}
        />
        <Tabs>
          <TabLabel index={0}>Comment</TabLabel>
          <TabLabel index={1}>Activity</TabLabel>
          <TabPanel index={0}>
            <CommentsSession
              userId={userInfo.id ?? ''}
              users={users}
              ticketId={ticketId}
              projectId={projectId}
            />
          </TabPanel>
          <TabPanel index={1}>
            <ActivitiesSession ticketId={ticketId} ticketInfo={ticketInfo ?? null} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default TicketDetailCard;
