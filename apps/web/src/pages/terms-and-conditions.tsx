import LegalDocumentPage from '../components/legal/LegalDocumentPage';
import { TERMS_AND_CONDITIONS } from '../lib/legal/legalDocuments';

export default function TermsAndConditionsPage() {
  return <LegalDocumentPage document={TERMS_AND_CONDITIONS} />;
}
