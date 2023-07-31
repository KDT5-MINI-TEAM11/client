export default function getPayloadFromJWT(jwt: string | null) {
  if (!jwt) {
    return null;
  }
  const payload = jwt.split('.')[1];
  const base64 = payload.replace(/_/g, '/').replace(/-/g, '+');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const decodedPayload = atob(base64 + padding);
  const payloadObject = JSON.parse(decodedPayload);
  return payloadObject;
}
