import LegalDocumentPage from '../components/legal/LegalDocumentPage';
import { COOKIE_POLICY } from '../lib/legal/legalDocuments';

export default function CookiePolicyPage() {
  return <LegalDocumentPage document={COOKIE_POLICY} />;
}
