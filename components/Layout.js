const Layout = ({ method, children }) => (
  <div>
    <div className="relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <h3 className="text-5xl font-bold text-center text-white">
            {method}
          </h3>
        </div>
      </div>
    </div>
    <div>{children}</div>
  </div>
);

export default Layout;
