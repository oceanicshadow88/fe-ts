import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDashBoardDailyScrumsByUser, getDashBoardData } from '../../../api/dashboard';
import { UserContext } from '../../../context/UserInfoProvider';
import { IDashboard, IDashBoardDailyScrum } from '../../../types';

const useFetchDashboardData = () => {
  const { id } = useContext(UserContext);
  const [data, setData] = useState<IDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    if (!projectId || !id) {
      return;
    }
    (async () => {
      try {
        const result = await getDashBoardData(projectId, id);
        setData(result);
        setIsLoading(false);
      } catch (e) {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
  }, [projectId, id]);

  return { data, isLoading };
};

export const useFetchDashboardDailyScrumsByUser = (id: string) => {
  const [data, setData] = useState<IDashBoardDailyScrum[] | null>(null);
  const isMountedRef = useRef(false);
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    if (!projectId || !id) {
      return;
    }
    (async () => {
      try {
        const result = await getDashBoardDailyScrumsByUser(projectId, id);
        setData(result);
      } catch (e) {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
  }, [projectId, id]);

  return data;
};

export default useFetchDashboardData;
