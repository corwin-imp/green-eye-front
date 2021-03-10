import { Voter } from '../voter.interface';
import user from '../../services/user-auth';
import UserRole from '../../enumerables/user-role';

class RoleVoter implements Voter {
    vote(action: string, subject: any): boolean {
        return (
            (user.isLoggedIn() && user.getRoles().includes(action)) ||
            (user.isLoggedIn() && user.getRoles().includes(UserRole.ROLE_ADMIN))
        );
    }

    supports(action: string, subject: any) {
        return -1 !== action.indexOf('ROLE_');
    }
}

export default RoleVoter;
