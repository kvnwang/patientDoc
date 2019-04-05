<Route exact path="/login" render={(props) => (!isLoggedIn ? (  <Redirect to="/error"/>  ) : (  <Login{...props}/>)  )}/>
// <ProtectedRoute path="/login" component={props => <Login {...props} />} />
