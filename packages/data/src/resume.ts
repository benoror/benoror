import { PERSONAL } from '@workspace/data/personal';
import { gmailAlias } from '@workspace/utils/email';

export const RESUME = {
  name: PERSONAL.short_name,
  header: 'Tech Lead - Software Engineer - Full Stack Developer',
  public_email: gmailAlias(PERSONAL.private_email, 'cv')
}
