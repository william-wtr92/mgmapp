import NavBar from "./NavBar"

const Layout = (props: any) => {
  const { children } = props

  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div>{children}</div>
        </main>
      </div>
    </>
  )
}
export default Layout
