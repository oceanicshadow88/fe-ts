import React from 'react';
import { IProduct } from '../../../types';
import styles from './PlanTable.module.scss';
import PlanTableBody from './PlanTableBody/PlanTableBody';
import PlanTableHeader from './PlanTableHeader/PlanTableHeader';

const accessibility = {
  content: {
    title: 'Accessbility',
    content: [
      {
        id: 0,
        name: 'Web access, desktop or laptop',
        free_check: true,
        advanced_check: true,
        ultra_check: true,
        enterprise_check: true
      },
      {
        id: 1,
        name: 'Smartphone',
        free_check: true,
        advanced_check: true,
        ultra_check: true,
        enterprise_check: true
      },
      {
        id: 2,
        name: 'API Access',
        free_check: false,
        advanced_check: false,
        ultra_check: false,
        enterprise_check: true
      }
    ]
  }
};

const usersPermissions = {
  content: {
    title: 'Users & Permissions',
    content: [
      {
        id: 0,
        name: 'Free users licenses (included in plan)',
        free_check: '1',
        advanced_check: '2',
        ultra_check: '5',
        enterprise_check: '10+'
      },
      {
        id: 1,
        name: 'Maximum number of user licenses',
        free_check: '1',
        advanced_check: '5',
        ultra_check: '9',
        enterprise_check: 'No limit'
      },
      {
        id: 2,
        name: 'Provide customer access',
        free_check: false,
        advanced_check: true,
        ultra_check: true,
        enterprise_check: true
      },
      {
        id: 3,
        name: 'Basic access controls',
        free_check: false,
        advanced_check: true,
        ultra_check: true,
        enterprise_check: true
      },
      {
        id: 4,
        name: 'Give limited or read-only permissions',
        free_check: false,
        advanced_check: true,
        ultra_check: true,
        enterprise_check: true
      },
      {
        id: 5,
        name: 'View user activity',
        free_check: false,
        advanced_check: true,
        ultra_check: true,
        enterprise_check: true
      },
      {
        id: 6,
        name: 'SSO',
        free_check: false,
        advanced_check: false,
        ultra_check: false,
        enterprise_check: true
      }
    ]
  }
};

interface IPlanTableProps {
  productsInfo: IProduct[];
  isMonthly: boolean;
  handleButtonClick: (priceId: string) => void;
  currentPlanId: string;
  customerId: string;
  handleManageSubscriptionClick: (customerId: string) => void;
  plansUserHasSubscribed: string[];
}

function PlanTable(props: IPlanTableProps) {
  const {
    productsInfo,
    isMonthly,
    handleButtonClick,
    currentPlanId,
    customerId,
    handleManageSubscriptionClick,
    plansUserHasSubscribed
  } = props;

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <PlanTableHeader
          productsInfo={productsInfo}
          isMonthly={isMonthly}
          handleButtonClick={handleButtonClick}
          currentPlanId={currentPlanId}
          customerId={customerId}
          handleManageSubscriptionClick={handleManageSubscriptionClick}
          plansUserHasSubscribed={plansUserHasSubscribed}
        />
        <PlanTableBody accessibility={accessibility} usersPermissions={usersPermissions} />
      </table>
    </div>
  );
}
export default PlanTable;
