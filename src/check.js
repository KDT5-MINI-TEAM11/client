<Route element={<MyLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route element={<ProtectedRoute />}>
    <Route element={<MyAccountLayout />}>
      <Route path="/myaccount" element={<MyAccount />} />
      <Route path="myaccount/vacation" element={<Vacation />} />
      <Route element={<ProtectedManagerRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="myaccount/approve" element={<Approve />} />
          <Route path="myaccount/promote" element={<Promote />} />
        </Route>
      </Route>
    </Route>
  </Route>
  <Route path="*" element={<NotFound />} />
</Route>;
