import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TrialHeading from './TrailHeading/TrailHeading';
import PlanTable from './PlanTable/PlanTable';
import Footer from '../../components/Footer/Footer';
import styles from './PricePage.module.scss';
import { UserContext } from '../../context/UserInfoProvider';
import {
  createCheckoutSession,
  getProductsInfo,
  getCurrentPlanId,
  isCurrentPlanFree,
  getCustomerId,
  createCustomerPortal,
  getSubscriptionHistory
} from '../../api/payment/payment';
import ProductCard from './ProductCard/ProductCard';
import { IProduct } from '../../types';

const productPlans = {
  Free: {
    features: ['100 entries', '1 user license', '1 custom field', 'Help center and email support'],
    monthlyDiscountInfo: null,
    yearlyDiscountInfo: null,
    isMostPopular: false,
    isFreePlan: true,
    isEnterprisePlan: false,
    subscriptionButtonLabel: 'Sign Up'
  },
  Advanced: {
    features: [
      '2,000 entries',
      '2 user licenses',
      '10 custom fields',
      'Help center and email support',
      'Unlimited QR code label generation',
      'In-app barcode scanner'
    ],
    monthlyDiscountInfo: 'to annual save $240',
    yearlyDiscountInfo: '$348 billed yearly save $240',
    isMostPopular: false,
    isFreePlan: false,
    isEnterprisePlan: false,
    subscriptionButtonLabel: 'Start Trial'
  },
  Ultra: {
    features: [
      '10,000 entries',
      '5 user licenses',
      '25 custom fields',
      'Priority email support',
      'Unlimited QR code & barcode label generation',
      'In-app barcode scanner',
      'Use external/handheld scanners'
    ],
    monthlyDiscountInfo: 'to annual save $1,080',
    yearlyDiscountInfo: '$708 billed yearly save $1,080',
    isMostPopular: true,
    isFreePlan: false,
    isEnterprisePlan: false,
    subscriptionButtonLabel: 'Start Trial'
  },
  Enterprise: {
    features: [
      'Unlimited entries',
      '10+ user licenses',
      'Unlimited custom fields',
      'Scheduled phone support and custom training',
      'Unlimited QR code & barcode label generation',
      'In-app barcode scanner',
      'Use external/handheld scanners',
      'API Access',
      'SSO'
    ],
    monthlyDiscountInfo: null,
    yearlyDiscountInfo: null,
    isMostPopular: false,
    isFreePlan: false,
    isEnterprisePlan: true,
    subscriptionButtonLabel: 'Contact Us'
  }
};

function PricePage() {
  const [isMonthly, setIsMonthly] = useState(false);
  const navigate = useNavigate();
  const userInfo = useContext(UserContext);
  const { id: userId, email } = userInfo;
  const [productsInfo, setProductsInfo] = useState<IProduct[]>([]);
  const [customerSubscriptionHistory, setCustomerSubscriptionHistory] = useState<string[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string>('');
  const [currentPlanIsFree, setCurrentPlanIsFree] = useState<boolean>(true);
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProductsInfo();
      const allProductsInfo = productsData.data.productsInfo.map((product) => ({
        ...product,
        productPlanDetails: productPlans[product.productName] || {}
      }));
      setProductsInfo(allProductsInfo);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!userId) return;
    isCurrentPlanFree().then((data) => {
      setCurrentPlanIsFree(data.data);
    });
    getCurrentPlanId().then((data) => {
      setCurrentPlanId(data.data);
    });
    getCustomerId().then((data) => {
      setCustomerId(data.data);
    });
    getSubscriptionHistory().then((data) => {
      setCustomerSubscriptionHistory(data.data);
    });
  }, [userId]);

  const handleToggleBillingPlan = () => {
    setIsMonthly((isEnabled) => !isEnabled);
  };

  const handleButtonClick = async (stripePriceId: string) => {
    const isUserAndPriceValid = userId && email && stripePriceId;
    if (!isUserAndPriceValid) {
      navigate(`/login?stripePriceId=${stripePriceId}`);
      return;
    }
    const checkoutSessionData = await createCheckoutSession(stripePriceId, customerId);
    if (checkoutSessionData.data.isPlanFree) {
      navigate('/price');
      return;
    }
    window.location = checkoutSessionData.data.url;
  };

  const handleManageSubscriptionClick = (subscriberId: string) => {
    createCustomerPortal(subscriberId).then((data) => {
      if (!data) {
        navigate(`/projects`);
        return;
      }
      window.location = data.data;
    });
  };

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.priceBody}>
        <TrialHeading isMonthly={isMonthly} handleToggleBillingPlan={handleToggleBillingPlan} />
        <div className={styles.group}>
          {productsInfo.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              isMonthly={isMonthly}
              handleToggleBillingPlan={handleToggleBillingPlan}
              handleButtonClick={handleButtonClick}
              currentPlanId={currentPlanId}
              currentPlanIsFree={currentPlanIsFree}
              currentPlanName={product.productName}
              customerId={customerId}
              handleManageSubscriptionClick={handleManageSubscriptionClick}
              plansUserHasSubscribed={customerSubscriptionHistory}
            />
          ))}
        </div>
        <PlanTable
          productsInfo={productsInfo}
          isMonthly={isMonthly}
          handleButtonClick={handleButtonClick}
          currentPlanId={currentPlanId}
          customerId={customerId}
          handleManageSubscriptionClick={handleManageSubscriptionClick}
          plansUserHasSubscribed={customerSubscriptionHistory}
        />
      </div>
      <Footer />
    </div>
  );
}

export default PricePage;
