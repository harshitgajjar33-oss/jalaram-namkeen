# Hostinger Deployment Packaging Script for Next.js Standalone
# Use this to create a clean ZIP file that doesn't include Windows node_modules conflicts.

echo "--- 1. Generating Production Build ---"
npm run build

echo "--- 2. Creating Deployment Folder ---"
$deployDir = "deploy_hostinger"
if (Test-Path $deployDir) { Remove-Item -Recurse -Force $deployDir }
New-Item -ItemType Directory -Force $deployDir

# Copy the standalone server and required files
echo "--- 3. Copying Standalone Build ---"
# Note: Next.js 'standalone' builds sometimes put themselves in a project-named subfolder
$standalonePath = ".next\standalone\jalaram-namkin-hq"
if (-Not (Test-Path $standalonePath)) {
    $standalonePath = ".next\standalone"
}
Copy-Item -Recurse -Force "$standalonePath\*" $deployDir

# Next.js standalone doesn't copy the public or static folders automatically
echo "--- 4. Copying Public & Static Assets ---"
if (-Not (Test-Path "$deployDir\public")) { New-Item -ItemType Directory "$deployDir\public" }
Copy-Item -Recurse -Force "public\*" "$deployDir\public"

if (-Not (Test-Path "$deployDir\.next\static")) { New-Item -ItemType Directory -Force "$deployDir\.next\static" }
Copy-Item -Recurse -Force ".next\static\*" "$deployDir\.next\static"

# Handle Prisma if needed
if (Test-Path "prisma") {
    echo "--- 5. Copying Prisma Schema ---"
    if (-Not (Test-Path "$deployDir\prisma")) { New-Item -ItemType Directory "$deployDir\prisma" }
    Copy-Item -Force "prisma\schema.prisma" "$deployDir\prisma\"
}

# DO NOT COPY node_modules - we will let Hostinger handle them to avoid Windows/Linux binary conflicts
echo "--- 6. Packaging into ZIP (Skipping node_modules) ---"
$zipFile = "deploy_ready_for_hostinger.zip"
if (Test-Path $zipFile) { Remove-Item $zipFile }
Compress-Archive -Path "$deployDir\*" -DestinationPath $zipFile

echo "------------------------------------------------"
echo "DONE! Upload '$zipFile' to Hostinger."
echo "Then on Hostinger, run 'npm install' to build the Linux-specific modules."
echo "------------------------------------------------"
