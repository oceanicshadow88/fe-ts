import React from 'react';
import styles from './PlanTableHeader.module.scss';
import { IProduct } from '../../../../types';

interface IPlanTableHeaderProps {
  productsInfo: IProduct[];
  isMonthly: boolean;
  handleButtonClick: (priceId: string) => void;
  currentPlanId: string;
  customerId: string;
  handleManageSubscriptionClick: (customerId: string) => void;
  plansUserHasSubscribed: string[];
}

function PlanTableHeader(props: IPlanTableHeaderProps) {
  const {
    productsInfo,
    isMonthly,
    handleButtonClick,
    currentPlanId,
    customerId,
    handleManageSubscriptionClick,
    plansUserHasSubscribed
  } = props;

  const renderProductPricingInfo = (product: IProduct, isPlanMonthly: boolean) => {
    if (product.productPlanDetails.isEnterprisePlan) {
      return <span>Get a Quote</span>;
    }
    const isMissingPrice = !product.prices?.yearly && !product.prices?.monthly;
    if (isMissingPrice) {
      return null;
    }
    const planYearlyPrice = product.prices.yearly && !product.prices.monthly;
    if (planYearlyPrice) {
      return <span>${product.prices?.yearly?.subscriptionAmount}/mo</span>;
    }
    const amount = isPlanMonthly
      ? product.prices.monthly?.subscriptionAmount
      : product.prices.yearly?.subscriptionAmount;
    return <span>${amount}/mo</span>;
  };

  const renderSubscriptionButton = (product: IProduct) => {
    if (currentPlanId === product.productId) {
      return <h2 className={styles.currentPlan}>Current Plan</h2>;
    }
    const priceId = isMonthly
      ? product.prices.monthly?.priceId ?? ''
      : product.prices.yearly?.priceId ?? '';
    return (
      <div className={styles.buttons}>
        <button
          className={styles.action}
          onClick={() =>
            plansUserHasSubscribed.includes(product.productName)
              ? handleManageSubscriptionClick(customerId)
              : handleButtonClick(priceId)
          }
        >
          {plansUserHasSubscribed.includes(product.productName)
            ? 'Manage Subscription'
            : product.productPlanDetails.subscriptionButtonLabel}
        </button>
      </div>
    );
  };

  return (
    <>
      <thead className={styles.head}>
        <tr className={styles.planRow}>
          <th className={styles.planHeader}>Plans</th>
          {productsInfo.map((product) => (
            <th key={product.productId}>
              {product.productName}
              {renderProductPricingInfo(product, isMonthly)}
              {renderSubscriptionButton(product)}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

export default PlanTableHeader;
