import LegalDocumentPage from '../components/legal/LegalDocumentPage';
import { PRIVACY_POLICY } from '../lib/legal/legalDocuments';

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage document={PRIVACY_POLICY} />;
}
