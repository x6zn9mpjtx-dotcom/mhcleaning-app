import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Diensten is een sectie op de homepage geworden. Oude links blijven werken.
  // Bewust tijdelijk (307): een permanente doorverwijzing wordt door browsers
  // blijvend onthouden, waardoor /diensten onbereikbaar wordt als we die pagina
  // ooit terugzetten.
  async redirects() {
    return [
      { source: '/diensten', destination: '/#diensten', permanent: false },
    ];
  },
};

export default nextConfig;
