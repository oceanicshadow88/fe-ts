import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import styles from './StarredProjectItem.module.scss';
import useHandleStarClick from './useHandleStarClick/useHandleStarClick';

interface IStartProject {
  iconUrl: string;
  projectName: string;
  projectId: string;
}

export default function StartProject(props: IStartProject) {
  const { iconUrl, projectName, projectId } = props;
  const [isStarred, handleStarClick] = useHandleStarClick(projectId);

  return (
    <div className={styles.container}>
      <Link to={`/projects/${projectId}/board`} className={styles.linkContainer}>
        <div className={styles.projectIcon}>
          <img
            src={
              iconUrl ||
              'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=small'
            }
            alt="icon"
          />
        </div>
        <span>{projectName}</span>
        {isStarred ? (
          <div className={styles.starContainer}>
            <button type="button" onClick={handleStarClick}>
              <AiFillStar className={styles.starFilledIcon} />
            </button>
            <div className={styles.notification}>Add to Starred</div>
          </div>
        ) : (
          <div className={styles.starContainer}>
            <button type="button" onClick={handleStarClick}>
              <AiOutlineStar className={styles.starOutlineIcon} />
            </button>
            <div className={styles.removeNotification}>Remove from Starred</div>
          </div>
        )}
      </Link>
    </div>
  );
}
