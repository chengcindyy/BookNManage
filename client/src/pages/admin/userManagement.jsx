import Container from '@mui/material/Container';
import MemberTable  from '../../components/memberTable';

const UserManagement = () => {

    return ( 
        <Container maxWidth="xl" sx={{ padding: 3, margin: 'auto' }}>
            <h1>User Management</h1>
            <MemberTable />
        </Container>
     );
}
 
export default UserManagement;