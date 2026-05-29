exports.handler = async function() {
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{
            relation: ["delegate_permission/common.handle_all_urls"],
            target: {
                namespace: "android_app",
                package_name: "com.educareai.app",
                sha256_cert_fingerprints: [
                    "84:1E:76:3C:3F:9A:D1:6B:B8:54:9C:47:AE:A9:31:2B:00:34:91:92:D4:14:83:2B:A3:C4:4E:55:18:CE:3A:C4",
                    "84:1E:76:3C:3F:9A:D1:6B:B8:54:9C:47:AE:A9:31:2B:00:34:97:B0:BC:1E:F7:1E:8A:71:3A:E0:46:D4:43:A1"
                ]
            }
        }])
    };
};
