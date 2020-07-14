export function parseJwt () {
  const base64Url = document.querySelector('meta[name="apiToken"]').getAttribute('content').split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export function validateUploadStatus (uploadedRows, failedRows) {
  if (failedRows === 0) {
    return JSON.parse('{ "colorIndicator":"text-success"}');
  } else if (uploadedRows === failedRows) {
    return JSON.parse('{ "colorIndicator":"text-danger"}');
  } else {
    return JSON.parse('{ "colorIndicator":"text-warning"}');
  }
}
