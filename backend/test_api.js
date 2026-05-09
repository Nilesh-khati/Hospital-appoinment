/* Simple API smoke test for the hospital appointment backend.
   Run: node test_api.js
*/

async function main() {
  const base = "http://localhost:5000";

  const resRoot = await fetch(base + "/");
  const rootJson = await resRoot.json();
  console.log("GET / ->", resRoot.status, rootJson);

  // Register patient
  const email1 = "testpatient" + Date.now() + "@mail.com";
  const patientReg = await fetch(base + "/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Patient",
      email: email1,
      password: "Password@123",
      role: "patient",
    }),
  });

  const patientRegJson = await patientReg.json();
  console.log(
    "POST /api/auth/register(patient) ->",
    patientReg.status,
    patientRegJson?.message || patientRegJson,
  );

  const token = patientRegJson?.token;
  if (!token) {
    console.log(
      "No token returned; aborting auth-protected endpoints smoke test.",
    );
    return;
  }

  // Fetch doctors
  const doctorsRes = await fetch(base + "/api/users/doctors", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const doctorsJson = await doctorsRes.json();
  console.log(
    "GET /api/users/doctors ->",
    doctorsRes.status,
    Array.isArray(doctorsJson) ? "count=" + doctorsJson.length : doctorsJson,
  );

  // Register a doctor (so we can book)
  const email2 = "testdoctor" + Date.now() + "@mail.com";
  const doctorReg = await fetch(base + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: "Test Doctor",
      email: email2,
      password: "Password@123",
      role: "doctor",
    }),
  });

  const doctorRegJson = await doctorReg.json();
  console.log(
    "POST /api/auth/register(doctor) ->",
    doctorReg.status,
    doctorRegJson?.message || doctorRegJson,
  );

  const doctorId =
    doctorRegJson?.user?.id ||
    doctorRegJson?.user?._id ||
    doctorRegJson?.doctorId;
  if (!doctorId) {
    console.log("Could not determine doctorId; aborting booking smoke test.");
    return;
  }

  // Book appointment
  const bookingRes = await fetch(base + "/api/appointments/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      doctorId,
      date: "2026-01-01",
      time: "10:00",
    }),
  });
  const bookingJson = await bookingRes.json();
  console.log("POST /api/appointments/book ->", bookingRes.status, bookingJson);

  const appointmentId = bookingJson?._id;
  if (!appointmentId) {
    console.log(
      "Booking did not return appointment _id; aborting cancel/get smoke test.",
    );
    return;
  }

  // Get appointments
  const apptsRes = await fetch(base + "/api/appointments", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const apptsJson = await apptsRes.json();
  console.log(
    "GET /api/appointments ->",
    apptsRes.status,
    Array.isArray(apptsJson) ? "count=" + apptsJson.length : apptsJson,
  );

  // Cancel appointment
  const cancelRes = await fetch(
    base + "/api/appointments/cancel/" + appointmentId,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const cancelJson = await cancelRes.json();
  console.log(
    "PUT /api/appointments/cancel/:id ->",
    cancelRes.status,
    cancelJson,
  );
}

main().catch((e) => {
  console.error("Smoke test failed:", e);
  process.exit(1);
});
