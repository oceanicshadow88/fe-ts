import React from 'react';
import styles from './PlanTableBody.module.scss';

interface IPlanTableBodyProps {
  accessibility: any;
  usersPermissions: any;
}

function PlanTableBody(props: IPlanTableBodyProps) {
  const { accessibility, usersPermissions } = props;
  return (
    <>
      <tbody className={styles.body}>
        <tr>
          <th className={styles.header}>Accessibility</th>
          <td aria-label="1" />
          <td aria-label="2" />
          <td aria-label="3" />
          <td aria-label="4" />
        </tr>

        {accessibility.content.content.map((each) => (
          <tr key={each.id} className={styles.content_tr}>
            <th key={each.id} className={styles.item}>
              {each.name}
            </th>
            {each.free_check ? (
              <td>
                <i className={styles.check} />
              </td>
            ) : (
              <td>
                <i className={styles.bullet} />
              </td>
            )}
            {each.advanced_check ? (
              <td>
                <i className={styles.check} />
              </td>
            ) : (
              <td>
                <i className={styles.bullet} />
              </td>
            )}
            {each.ultra_check ? (
              <td>
                <i className={styles.check} />
              </td>
            ) : (
              <td>
                <i className={styles.bullet} />
              </td>
            )}
            {each.enterprise_check ? (
              <td>
                <i className={styles.check} />
              </td>
            ) : (
              <td>
                <i className={styles.bullet} />
              </td>
            )}
          </tr>
        ))}

        <tr>
          <th className={styles.second_header}>Users & Permissions</th>
          <td aria-label="1" />
          <td aria-label="2" />
          <td aria-label="3" />
          <td aria-label="4" />
        </tr>

        {usersPermissions.content.content.map((each) => (
          <tr key={each.id} className={styles.content_tr}>
            <th key={each.id} className={styles.item}>
              {each.name}
            </th>
            {typeof each.free_check !== 'boolean' && <td>{each.free_check}</td>}
            {typeof each.free_check === 'boolean' && each.free_check && (
              <td>
                <i className={styles.check} />
              </td>
            )}
            {typeof each.free_check === 'boolean' && !each.free_check && (
              <td>
                <i className={styles.bullet} />
              </td>
            )}

            {typeof each.advanced_check !== 'boolean' && <td>{each.advanced_check}</td>}
            {typeof each.advanced_check === 'boolean' && each.advanced_check && (
              <td>
                <i className={styles.check} />
              </td>
            )}
            {typeof each.advanced_check === 'boolean' && !each.advanced_check && (
              <td>
                <i className={styles.bullet} />
              </td>
            )}

            {typeof each.ultra_check !== 'boolean' && <td>{each.ultra_check}</td>}
            {typeof each.ultra_check === 'boolean' && each.ultra_check && (
              <td>
                <i className={styles.check} />
              </td>
            )}
            {typeof each.ultra_check === 'boolean' && !each.ultra_check && (
              <td>
                <i className={styles.bullet} />
              </td>
            )}
            {typeof each.enterprise_check !== 'boolean' && <td>{each.enterprise_check}</td>}
            {typeof each.enterprise_check === 'boolean' && each.enterprise_check && (
              <td>
                <i className={styles.check} />
              </td>
            )}
            {typeof each.enterprise_check === 'boolean' && !each.enterprise_check && (
              <td>
                <i className={styles.bullet} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default PlanTableBody;
