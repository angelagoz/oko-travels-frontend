// ========================================
// CONFIGURACIÓN CLOUDINARY - LUCHRIS TRAVELS
// ========================================

// PASO 1: Ve a https://cloudinary.com y crea una cuenta GRATIS
// PASO 2: En tu dashboard, obtén:
//   - Cloud Name (visible en el dashboard)
//   - Upload Preset (Settings → Upload → Unsigned Upload)
// PASO 3: Reemplaza los valores abajo

const CLOUDINARY_CONFIG = {
    // Reemplaza "tu_cloud_name" con tu Cloud Name de Cloudinary
    // Ej: cloudName: "mycloudname123"
    cloudName: "tu_cloud_name",

    // Reemplaza "tu_upload_preset" con tu Upload Preset
    // Ej: uploadPreset: "my_unsigned_preset"
    uploadPreset: "tu_upload_preset"
};

// Validar que esté configurado
function verificarCloudinaryConfig() {
    if (CLOUDINARY_CONFIG.cloudName === "tu_cloud_name" ||
        CLOUDINARY_CONFIG.uploadPreset === "tu_upload_preset") {
        console.error('❌ CLOUDINARY NO ESTÁ CONFIGURADO');
        console.log('📖 Lee la guía: FOTOS_CLOUDINARY.md');
        return false;
    }
    console.log('✅ Cloudinary configurado correctamente');
    return true;
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLOUDINARY_CONFIG, verificarCloudinaryConfig };
}
