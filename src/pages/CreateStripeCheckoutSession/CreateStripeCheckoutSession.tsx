import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createCheckoutSession, getCustomerId } from '../../api/payment/payment';
import { UserContext } from '../../context/UserInfoProvider';

export default function CreateStripeCheckoutSession() {
  const userInfo = useContext(UserContext);
  const { email } = userInfo;
  const [searchParams] = useSearchParams();
  const stripePriceId = searchParams.get('stripePriceId');
  const [customerId, setCustomerId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getCustomerId().then((data) => {
      setCustomerId(data.data);
    });
  }, []);

  useEffect(() => {
    const isMissingData = !stripePriceId || !email || !customerId;
    if (isMissingData) return;
    const alreadyRedirected = localStorage.getItem(`redirected_${stripePriceId}`);
    if (alreadyRedirected) {
      navigate(`/price`);
      return;
    }
    localStorage.setItem(`redirected_${stripePriceId}`, 'true');
    createCheckoutSession(stripePriceId, customerId).then((data) => {
      if (data.data.isPlanFree) {
        navigate(`/price`);
        return;
      }
      window.location = data.data.url;
    });
  }, [email, stripePriceId, customerId]);

  return <></>;
}
