import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { getUser } from 'helpers/parseJWT';
import { getEmailTemplate } from 'service/marketing';
import EmailTemplate from 'components/Marketing/EmailTemplate';
import { SubRoutesMarketing } from 'components/Marketing/SubRoutesMarketing';

const EmailTemplatePage = () => {
  const [emailTemplateData, setEmailTemplatedata] = useState(null);
  const [loading, setIsloading] = useState(false);
  // const { obe: userOBE } = useSelector(selectAddData);

  useEffect(() => {
    if (!loading) {
      _getEmailTemplate();
    }
  }, [loading]);

  const _getEmailTemplate = async () => {
    const response = await getEmailTemplate();
    if (response?.status === 200) {
      setEmailTemplatedata(response?.data);
    }
  };

  return (
    <Layout routes={SubRoutesMarketing()} title="Marketing">
      {emailTemplateData && <EmailTemplate emailTemplateData={emailTemplateData} _getEmailTemplate={_getEmailTemplate}/>}
    </Layout>
  );
};

export default EmailTemplatePage;
