function Login() {
  return (
    <div className="App-body border-t-[2px] border-[var(--main-color)]">
      <p className="mt-[20px] ml-[40px]">Login to access the full dashboard</p>
      <form className="ml-[40px] mt-[20px]">
        <label htmlFor="email">Email</label>
        <input className=' w-57 border border-black ml-1.5 rounded p-1.5' type="email" id="email" autoComplete="email" />
        <label className="ml-1.5" htmlFor="password">Password</label>
        <input className=' w-57 border border-black ml-1.5 rounded p-1' type="password" id="password" autoComplete="current-password" />
        <button className='ml-1.5 cursor-pointer border border-black rounded r p-1'>OK</button>
      </form>
    </div>
  );
}

export default Login;
