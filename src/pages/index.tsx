import withAuth from '../services/auth/withAuth'
import { useUser } from '../services/auth/useUser'

const Home = () => {
  const { user, logout } = useUser()

  return (
    <div>
      <div>Private</div>
      {user?.email && (
        <div>
          <div>Email: {user.email}</div>
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default withAuth(Home)
