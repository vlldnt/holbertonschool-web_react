function Login() {
  return (
    <div className="App-body border-t-[2px] border-[var(--main-color)] h-full">
      <p className="mt-[20px] tablet:ml-[40px]">Login to access the full dashboard</p>
      <form className="tablet:ml-[40px] mt-[20px] flex flex-col justify-between tablet:block">
        <label htmlFor="email">Email</label>
        <input className='w-50 tablet:w-57 border border-black tablet:ml-1.5 rounded p-1tablet:mt-0 mt-1.5' type="email" id="email" autoComplete="email" />
        <label className="tablet:ml-1.5tablet:mt-0 mt-1.5" htmlFor="password">Password</label>
        <input className='w-50 tablet:w-57 border border-black tablet:ml-1.5 rounded p-1tablet:mt-0 mt-1.5' type="password" id="password" autoComplete="current-password" />
        <button className='tablet:ml-1.5 tablet:mt-0 mt-1.5 w-8 h-8 cursor-pointer border border-black rounded p-1 text-base font-medium text-center'>OK</button>
      </form>
    </div>
  );
}

export default Login;
