import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = () => {

  const loggedIn ={ firstName: 'Francisco', lastName: 'Sanchez', email: 'fsanchezdurand@gmail.com'};

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || 'Guest'}
          subtext="Access and manage your account and transactions efficiently"
          />

          <TotalBalanceBox 
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.35}
          />


        </header>
                  RECENT TRANSACTIONS

      </div>
      <RightSidebar 
      user={loggedIn}
      transaction={[]}
<<<<<<< HEAD
      banks={[{ currentBalance: 123.50}, { currentBalance: 123.50}]}
=======
      banks={[{}, {}]}
>>>>>>> 682ae20 (Tailwind version corrected, Added responsive and MobileNav, Chart and Animations.)
      />
    </section>
  )
}

export default Home