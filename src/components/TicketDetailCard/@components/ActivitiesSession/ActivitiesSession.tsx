import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { JSONContent } from '@tiptap/core';
import style from './ActivitiesSession.module.scss';
import TimeAgo from '../../../TimeAgo/TimeAgo';
import Avatar from '../../../Avatar/Avatar';
import { getActivity } from '../../../../api/activity/activity';
import { IActivityData, ITicketDetails } from '../../../../types';

interface IActivitiesSessionProps {
  ticketId: string;
  ticketInfo: ITicketDetails | null;
}

export default function ActivitiesSession({ ticketId, ticketInfo }: IActivitiesSessionProps) {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const { data } = await getActivity(ticketId);
    return data;
  };

  const setActivitiesData = async () => {
    const activitiesData = await fetchActivities();
    setActivities(activitiesData);
  };

  useEffect(() => {
    setActivitiesData();
  }, [ticketInfo]);

  const extractPlainText = (json: JSONContent): string => {
    if (!json || typeof json !== 'object') return '';

    // if it's a text node, return the text
    if (json.type === 'text') {
      return json.text || '';
    }

    // if it's a paragraph, join the content
    if (Array.isArray(json.content)) {
      return json.content.map(extractPlainText).join(json.type === 'paragraph' ? '\n' : '');
    }

    return '';
  };

  const extractTime = (date: string) => {
    return new Date(date).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const renderValueComponent = (value: string[], componentStyle: string) => {
    return value.length > 0 ? (
      <span className={style[componentStyle]}>{value}</span>
    ) : (
      <span className={style.none}> None </span>
    );
  };

  const renderLoopValues = (field: string, values: string[]) => {
    if (!values || values.length === 0) {
      return <span className={style.none}>None</span>;
    }

    return values.map((value) => {
      return (
        <span key={crypto.randomUUID()} className={style.valueText}>
          {value}
        </span>
      );
    });
  };

  const renderUpdatedValues = (activity: IActivityData) => {
    if (activity.operation === 'create') {
      return null;
    }

    const { field, prevValues, afterValues } = activity;

    let renderPreValues = prevValues;
    let renderAfterValues = afterValues;

    let previousValueStyle = 'valueText';
    let newValueStyle = 'valueText';

    switch (field) {
      case 'Status': {
        previousValueStyle =
          prevValues.length > 0 ? prevValues[0].toLowerCase().replace(' ', '-') : 'unknown';
        newValueStyle =
          afterValues.length > 0 ? afterValues[0].toLowerCase().replace(' ', '-') : 'unknown';

        renderPreValues = prevValues.length > 0 ? [prevValues[0].toUpperCase()] : [];
        renderAfterValues = afterValues.length > 0 ? [afterValues[0].toUpperCase()] : [];
        break;
      }
      case 'Description': {
        renderPreValues =
          prevValues.length > 0 && prevValues[0]
            ? [extractPlainText(JSON.parse(prevValues[0]))]
            : [];
        renderAfterValues =
          afterValues.length > 0 && afterValues[0]
            ? [extractPlainText(JSON.parse(afterValues[0]))]
            : [];
        break;
      }
      case 'Due At': {
        renderPreValues = prevValues.length > 0 ? [extractTime(prevValues[0])] : [];
        renderAfterValues = afterValues.length > 0 ? [extractTime(afterValues[0])] : [];
        break;
      }
      case 'Labels':
      case 'Assign': {
        return (
          <p className={style.activity}>
            <span className={`${style.field}`}>{field} </span>
            {renderLoopValues(field, prevValues)}
            <FiArrowRight className={style.icon} />
            {renderLoopValues(field, afterValues)}
          </p>
        );
      }
      default:
        break;
    }

    return (
      <p className={style.activity}>
        <span className={style.field}>{field} </span>
        {renderValueComponent(renderPreValues, previousValueStyle)}
        <FiArrowRight className={style.icon} />
        {renderValueComponent(renderAfterValues, newValueStyle)}
      </p>
    );
  };

  return (
    <>
      {activities.map((activity: IActivityData, index) => {
        return (
          <div key={activity.id} className={style.container}>
            <div key={activity.id} className={style.headContainer}>
              <div className={style.userContainer}>
                <Avatar user={activity.user} />
                <p>{activity.user.name}</p>
              </div>
              <div className={style.operationContainer}>
                <p className={style.operation}>{activity.operation}</p>
                <TimeAgo className={style.time} date={activity.createdAt} />
              </div>
            </div>
            <div className={style.activityContainer}>{renderUpdatedValues(activity)}</div>

            {index !== activities.length - 1 && <hr className={style.divider} />}
          </div>
        );
      })}
    </>
  );
}
