import { useState } from "react";

const login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container-fluid min-vh-100 datas">
      <div className="row min-vh-100">
        {/* LEFT PANEL */}
        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white"
          style={{
            background: "linear-gradient(135deg, #0dcaf0, #0d6efd)",
          }}
        >
          <div className="text-center p-5">
            <h2 className="fw-bold mb-3">
              {isLogin ? "Welcome Back!" : "Join Mishu Mattress"}
            </h2>

            <p>
              {isLogin
                ? "Login to access your account and manage orders."
                : "Create your account and start shopping today."}
            </p>

            <button
              className="btn btn-light mt-3"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL (FORM) */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light p-4">
          <div
            className="card shadow-lg p-4 w-100"
            style={{ maxWidth: "450px" }}
          >
            <h3 className="text-center mb-4">
              {isLogin ? "Login" : "Create Account"}
            </h3>

            <form>
              {!isLogin && (
                <>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        placeholder="First name"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  placeholder="Enter password"
                />
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    placeholder="Confirm password"
                  />
                </div>
              )}

              <button className="btn btn-info w-100 rounded-pill">
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            {/* MOBILE TOGGLE */}
            <div className="text-center mt-3 d-md-none">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="btn btn-link"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default login;
