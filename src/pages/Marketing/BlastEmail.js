import Layout from 'components/Layout';
import BlastEmail from 'components/Marketing/BlastEmail';
import { SubRoutesMarketing } from 'components/Marketing/SubRoutesMarketing';

const BlastEmailPage = () => {
  return (
    <Layout routes={SubRoutesMarketing()} title="Marketing">
      <BlastEmail />
    </Layout>
  );
};

export default BlastEmailPage;
