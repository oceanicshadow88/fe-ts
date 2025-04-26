import React from 'react';
import styles from './ProductCard.module.scss';
import { IProduct } from '../../../types';

interface IProductCardProps {
  product: IProduct;
  isMonthly: boolean;
  handleToggleBillingPlan: () => void;
  handleButtonClick: (priceId: string) => void;
  currentPlanId: string;
  currentPlanIsFree: boolean;
  currentPlanName: string;
  customerId: string;
  handleManageSubscriptionClick: (customerId: string) => void;
  plansUserHasSubscribed: string[];
}
type ReadOnlyProductCardProps = Readonly<IProductCardProps>;

function ProductCard(props: ReadOnlyProductCardProps) {
  const {
    product,
    isMonthly,
    handleToggleBillingPlan,
    handleButtonClick,
    currentPlanId,
    currentPlanName,
    customerId,
    handleManageSubscriptionClick,
    plansUserHasSubscribed
  } = props;
  const {
    isFreePlan,
    isEnterprisePlan,
    isMostPopular,
    monthlyDiscountInfo,
    yearlyDiscountInfo,
    subscriptionButtonLabel,
    features
  } = product.productPlanDetails;

  const showMonthlyPriceForPaidPlans = isMonthly && !isEnterprisePlan && !isFreePlan;
  const showYearlyPriceForPaidPlans = !isMonthly && !isEnterprisePlan && !isFreePlan;
  const showYearlyDiscountInfo = !isMonthly && monthlyDiscountInfo;
  const notCurrentPlan = currentPlanId !== product.productId;
  const priceId = isMonthly
    ? product.prices.monthly?.priceId ?? ''
    : product.prices.yearly?.priceId ?? '';

  return (
    <div key={product.productId} className={styles.card}>
      <h1 className={styles.plan}>
        {product.productName}
        {isMostPopular && <span> Most Popular</span>}
      </h1>
      <p className={styles.description}>{product.productDescription}</p>
      <div className={styles.discount}>
        <div className={styles.price}>
          {isFreePlan && <span className={styles.yearlyPrice}>$0/mo</span>}
          {showYearlyPriceForPaidPlans && (
            <>
              <span className={styles.monthlyPrice}>
                ${product.prices?.monthly?.subscriptionAmount}
              </span>
              <span className={styles.yearlyPrice}>
                ${product.prices?.yearly?.subscriptionAmount}/mo
              </span>
            </>
          )}
          {showMonthlyPriceForPaidPlans && (
            <span className={styles.yearlyPrice}>
              ${product.prices?.monthly?.subscriptionAmount}
            </span>
          )}
          {isEnterprisePlan && <span>Get a Quote</span>}
        </div>
        {showYearlyDiscountInfo ? (
          <div className={styles.yearlyDiscountInformation}>{yearlyDiscountInfo}</div>
        ) : (
          yearlyDiscountInfo && (
            <div className={styles.yearlyDiscountInformation}>
              <button className={styles.switch} onClick={handleToggleBillingPlan}>
                Switch
              </button>{' '}
              {monthlyDiscountInfo}
            </div>
          )
        )}
      </div>

      {notCurrentPlan ? (
        <div className={styles.buttons}>
          <button
            className={styles.action}
            onClick={() =>
              plansUserHasSubscribed.includes(currentPlanName)
                ? handleManageSubscriptionClick(customerId)
                : handleButtonClick(priceId)
            }
          >
            {plansUserHasSubscribed.includes(currentPlanName)
              ? 'Manage Subscription'
              : subscriptionButtonLabel}
          </button>
        </div>
      ) : (
        <h2 className={styles.currentPlan}>Current Plan</h2>
      )}

      <div className={styles.service}>
        <h3 className={styles.include}>Includes:</h3>
        <ul className={styles.ul}>
          {features.map((feature) => (
            <li key={feature} className={styles.term}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default ProductCard;
