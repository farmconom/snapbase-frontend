import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logger } from '../../helper/logger';
import { toast } from 'react-toastify';
import { applyActionCode } from 'firebase/auth';
import { auth } from '../../firebase';
import FullSpinner from '../../component/@share/FullSpinner';
import { FaRegCheckCircle } from 'react-icons/fa';
import { errorFormat } from '../../helper/error-format';
import Button from '@mui/material/Button';

const log = new Logger('VerifyEmailPage');

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const oobCode = searchParams.get('oobCode');
    const apiKey = searchParams.get('apiKey');
    const userEmail = searchParams.get('userEmail');
    const redirectTo = (url: string) => {
      url && navigate(url);
    };

    if (userEmail) {
      setEmail(userEmail);
    }

    if (!oobCode || apiKey !== auth.config.apiKey) {
      toast.error(`Invalid key, Please check your URL.`);
      redirectTo('/');
      return;
    }

    const verifyEmail = async (oobCode: string) => {
      try {
        setIsLoading(true);
        await applyActionCode(auth, oobCode);
      } catch (error) {
        const errorText: string = errorFormat(error).message;
        log.error(errorText);
        if (!errorText.includes('invalid-action-code')) {
          toast.error(`Something's wrong, Please try again later.`);
        }
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail(oobCode);

    return () => {
      // Cleanup if needed
    };
  }, [location.search, navigate]);

  return (
    <>
      {!isLoading ? (
        <div className="flex justify-center items-center flex-col text-center p-3">
          <FaRegCheckCircle className="text-[120px] text-green-500" />
          <h1 className="text-[24px] sm:text-3xl md:text-4xl">
            Thank You for Verifying Your Email
          </h1>
          <p>
            Congratulations!{' '}
            <span className={email ? 'font-semibold text-green-500' : ''}>
              {email ? email : 'Your email address'}
            </span>{' '}
            has been successfully verified.
          </p>
          <p>
            Welcome to our community! You can now access all the features and
            benefits of our platform.
          </p>
          <Button
            variant="contained"
            color="success"
            className="!min-w-[200px] h-[40px] !mt-[50px] max-w-[200px] !text-lg w-full sm:w-auto !capitalize"
            type="submit"
            onClick={() => navigate('/')}>
            Go to Homepage
          </Button>
        </div>
      ) : (
        <FullSpinner isInPage />
      )}
    </>
  );
};

export default VerifyEmailPage;
