/**
 * High-definition, industrial SVG automotive component graphic generator.
 * Produces crisp, beautiful vector graphics for auto parts that load instantly
 * without external network dependency or 404 errors.
 */

function svgToDataUri(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export function generatePartSvg(type, title = 'Auto Part', oem = 'OEM-GENUINE', colorAccent = '#DC2626') {
  const width = 600;
  const height = 450;

  // Background and framing
  const baseBg = `
    <rect width="${width}" height="${height}" fill="#0D131F" />
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#141C2B" />
        <stop offset="100%" stop-color="#090E17" />
      </linearGradient>
      <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E2E8F0" />
        <stop offset="50%" stop-color="#94A3B8" />
        <stop offset="100%" stop-color="#475569" />
      </linearGradient>
      <linearGradient id="darkMetal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="50%" stop-color="#1E293B" />
        <stop offset="100%" stop-color="#0F172A" />
      </linearGradient>
      <linearGradient id="redAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#EF4444" />
        <stop offset="100%" stop-color="#B91C1C" />
      </linearGradient>
      <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F59E0B" />
        <stop offset="50%" stop-color="#D97706" />
        <stop offset="100%" stop-color="#92400E" />
      </linearGradient>
      <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1E293B" stroke-width="0.8" opacity="0.6" />
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#grid)" />
    <circle cx="300" cy="210" r="160" fill="${colorAccent}" opacity="0.06" filter="blur(40px)" />
  `;

  // Decorative metadata overlays (Bilal Ganj Stamp, Part Number)
  const overlayStamp = `
    <!-- Technical Grid & Framing -->
    <path d="M 25 35 L 25 25 L 35 25" fill="none" stroke="#64748B" stroke-width="2" />
    <path d="M 575 35 L 575 25 L 565 25" fill="none" stroke="#64748B" stroke-width="2" />
    <path d="M 25 415 L 25 425 L 35 425" fill="none" stroke="#64748B" stroke-width="2" />
    <path d="M 575 415 L 575 425 L 565 425" fill="none" stroke="#64748B" stroke-width="2" />
    
    <!-- Bilal Ganj Verified Watermark Badge -->
    <g transform="translate(30, 395)">
      <rect width="180" height="24" rx="4" fill="#1E293B" stroke="#334155" stroke-width="1" />
      <circle cx="12" cy="12" r="4" fill="#10B981" />
      <text x="24" y="16" fill="#94A3B8" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="0.5">
        BILAL GANJ BENCH TESTED
      </text>
    </g>

    <!-- OEM Part Stamp -->
    <g transform="translate(420, 395)">
      <rect width="150" height="24" rx="4" fill="#1E293B" stroke="#334155" stroke-width="1" />
      <text x="75" y="16" fill="#CBD5E1" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">
        ${oem}
      </text>
    </g>
  `;

  let partGraphic = '';

  switch (type) {
    case 'engine':
      partGraphic = `
        <!-- Engine Long Block Assembly -->
        <g transform="translate(160, 90)">
          <!-- Engine Base / Oil Pan -->
          <path d="M 60 210 L 220 210 L 205 245 L 75 245 Z" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2" />
          <rect x="75" y="240" width="130" height="15" rx="3" fill="#0F172A" stroke="#475569" stroke-width="1" />
          <!-- Crankcase Block -->
          <rect x="40" y="110" width="200" height="100" rx="6" fill="url(#metalGrad)" stroke="#334155" stroke-width="2" />
          <!-- Cylinder Head -->
          <rect x="30" y="60" width="220" height="50" rx="4" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2" />
          <!-- Valve Cover (Red Top Racing Style) -->
          <path d="M 40 60 L 240 60 L 230 25 L 50 25 Z" fill="url(#redAccent)" stroke="#EF4444" stroke-width="1.5" />
          <!-- Oil Filler Cap -->
          <circle cx="75" cy="38" r="12" fill="#0F172A" stroke="#CBD5E1" stroke-width="2" />
          <!-- VVT-i Badge Plate -->
          <rect x="105" y="36" width="70" height="14" rx="2" fill="#0F172A" />
          <text x="140" y="47" fill="#F8FAFC" font-family="sans-serif" font-size="9" font-weight="900" text-anchor="middle" letter-spacing="1">DUAL VVT-i</text>
          <!-- Intake Runners (Chrome Tubes) -->
          <path d="M 80 85 C 50 85, 30 110, 15 130" fill="none" stroke="url(#metalGrad)" stroke-width="12" stroke-linecap="round" />
          <path d="M 120 85 C 90 85, 70 110, 55 130" fill="none" stroke="url(#metalGrad)" stroke-width="12" stroke-linecap="round" />
          <path d="M 160 85 C 130 85, 110 110, 95 130" fill="none" stroke="url(#metalGrad)" stroke-width="12" stroke-linecap="round" />
          <path d="M 200 85 C 170 85, 150 110, 135 130" fill="none" stroke="url(#metalGrad)" stroke-width="12" stroke-linecap="round" />
          <!-- Serpentine Belt Pulleys -->
          <circle cx="250" cy="180" r="28" fill="url(#darkMetal)" stroke="#94A3B8" stroke-width="3" />
          <circle cx="250" cy="180" r="10" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="250" cy="115" r="20" fill="url(#darkMetal)" stroke="#94A3B8" stroke-width="2.5" />
          <circle cx="250" cy="115" r="6" fill="#0F172A" />
          <!-- Belt Line -->
          <path d="M 250 87 L 250 208" stroke="#1E293B" stroke-width="8" stroke-linecap="round" />
        </g>
      `;
      break;

    case 'gearbox':
      partGraphic = `
        <!-- Automatic / Manual Gearbox Transmission -->
        <g transform="translate(150, 100)">
          <!-- Bellhousing (Clutch/Torque converter case) -->
          <path d="M 50 30 C 110 20, 130 50, 140 70 L 250 80 L 280 120 L 280 180 L 230 200 L 140 180 C 120 220, 90 230, 40 220 L 40 30 Z" fill="url(#metalGrad)" stroke="#475569" stroke-width="2" />
          <!-- Bellhousing Flange Lip with Bolt Holes -->
          <ellipse cx="45" cy="125" rx="18" ry="95" fill="url(#darkMetal)" stroke="#94A3B8" stroke-width="3" />
          <circle cx="45" cy="50" r="4" fill="#CBD5E1" />
          <circle cx="45" cy="90" r="4" fill="#CBD5E1" />
          <circle cx="45" cy="130" r="4" fill="#CBD5E1" />
          <circle cx="45" cy="170" r="4" fill="#CBD5E1" />
          <circle cx="45" cy="205" r="4" fill="#CBD5E1" />
          <!-- Input Shaft Core -->
          <rect x="15" y="115" width="45" height="20" rx="3" fill="#E2E8F0" stroke="#334155" stroke-width="2" />
          <line x1="25" y1="115" x2="25" y2="135" stroke="#475569" stroke-width="2" />
          <line x1="35" y1="115" x2="35" y2="135" stroke="#475569" stroke-width="2" />
          <!-- Gearbox Tail Housing Extension -->
          <rect x="250" y="110" width="70" height="45" rx="5" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2" />
          <rect x="310" y="120" width="25" height="25" rx="3" fill="#94A3B8" stroke="#334155" stroke-width="2" />
          <!-- Solenoid / Valve Body Wiring Connector (Electronic Blue) -->
          <rect x="180" y="60" width="30" height="22" rx="4" fill="#2563EB" stroke="#60A5FA" stroke-width="1.5" />
          <circle cx="195" cy="71" r="4" fill="#EFF6FF" />
          <!-- Fluid Dipstick Tube -->
          <path d="M 170 60 C 180 20, 210 15, 230 15" fill="none" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" />
          <circle cx="232" cy="15" r="7" fill="none" stroke="#F59E0B" stroke-width="4" />
        </g>
      `;
      break;

    case 'shock':
      partGraphic = `
        <!-- High Performance Gas Strut / Shock Absorber -->
        <g transform="translate(180, 80)">
          <!-- Top Mounting Cup & Stud -->
          <rect x="100" y="10" width="40" height="20" rx="3" fill="#334155" stroke="#94A3B8" stroke-width="2" />
          <circle cx="120" cy="20" r="5" fill="#E2E8F0" />
          <!-- Chrome Piston Damper Rod -->
          <rect x="112" y="30" width="16" height="85" fill="url(#metalGrad)" stroke="#CBD5E1" stroke-width="1" />
          <!-- Coil Spring (Automotive Red / Racing Coil) -->
          <path d="M 75 55 Q 120 40, 165 55" fill="none" stroke="#DC2626" stroke-width="14" stroke-linecap="round" />
          <path d="M 75 85 Q 120 70, 165 85" fill="none" stroke="#DC2626" stroke-width="14" stroke-linecap="round" />
          <path d="M 75 115 Q 120 100, 165 115" fill="none" stroke="#DC2626" stroke-width="14" stroke-linecap="round" />
          <path d="M 75 145 Q 120 130, 165 145" fill="none" stroke="#DC2626" stroke-width="14" stroke-linecap="round" />
          <path d="M 75 175 Q 120 160, 165 175" fill="none" stroke="#DC2626" stroke-width="14" stroke-linecap="round" />
          <!-- Lower Spring Perch Seat -->
          <path d="M 60 195 L 180 195 L 160 215 L 80 215 Z" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2" />
          <!-- Main Gas Shock Absorber Cylinder (Black / Tokico Blue) -->
          <rect x="95" y="205" width="50" height="120" rx="6" fill="#1E293B" stroke="#0284C7" stroke-width="2.5" />
          <rect x="100" y="240" width="40" height="24" rx="2" fill="#0C4A6E" />
          <text x="120" y="255" fill="#38BDF8" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">TOKICO GAS</text>
          <!-- Bottom Knuckle Mount Bracket -->
          <path d="M 90 320 L 150 320 L 155 365 L 85 365 Z" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2" />
          <circle cx="105" cy="345" r="7" fill="#0F172A" stroke="#CBD5E1" stroke-width="2.5" />
          <circle cx="135" cy="345" r="7" fill="#0F172A" stroke="#CBD5E1" stroke-width="2.5" />
        </g>
      `;
      break;

    case 'brake':
      partGraphic = `
        <!-- Vented Cross-Drilled Brake Rotor with Performance Caliper -->
        <g transform="translate(170, 75)">
          <!-- Brake Rotor Outer Disc -->
          <circle cx="130" cy="140" r="125" fill="url(#metalGrad)" stroke="#CBD5E1" stroke-width="2" />
          <circle cx="130" cy="140" r="85" fill="#475569" stroke="#334155" stroke-width="2" />
          <circle cx="130" cy="140" r="50" fill="url(#darkMetal)" stroke="#64748B" stroke-width="3" />
          <!-- Lug Nut Stud Holes (5-Stud PCD Pattern) -->
          <circle cx="130" cy="108" r="7" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="160" cy="120" r="7" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="150" cy="158" r="7" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="110" cy="158" r="7" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="100" cy="120" r="7" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="130" cy="140" r="16" fill="#0F172A" stroke="#94A3B8" stroke-width="2" />
          <!-- Cross-Drilled Holes -->
          <circle cx="130" cy="35" r="3" fill="#1E293B" />
          <circle cx="150" cy="40" r="3" fill="#1E293B" />
          <circle cx="205" cy="75" r="3" fill="#1E293B" />
          <circle cx="220" cy="95" r="3" fill="#1E293B" />
          <circle cx="230" cy="150" r="3" fill="#1E293B" />
          <circle cx="210" cy="200" r="3" fill="#1E293B" />
          <circle cx="160" cy="235" r="3" fill="#1E293B" />
          <circle cx="95" cy="235" r="3" fill="#1E293B" />
          <circle cx="50" cy="190" r="3" fill="#1E293B" />
          <!-- Performance Racing Red Brake Caliper -->
          <path d="M 25 50 C 45 20, 100 20, 140 30 L 140 100 C 100 95, 60 95, 25 105 Z" fill="url(#redAccent)" stroke="#EF4444" stroke-width="2" />
          <!-- Caliper Piston Chambers & Bolts -->
          <circle cx="60" cy="62" r="14" fill="#991B1B" stroke="#FCA5A5" stroke-width="1.5" />
          <circle cx="105" cy="64" r="14" fill="#991B1B" stroke="#FCA5A5" stroke-width="1.5" />
          <text x="82" y="90" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="900" letter-spacing="2" text-anchor="middle">CERAMIC</text>
        </g>
      `;
      break;

    case 'headlight':
      partGraphic = `
        <!-- Bi-Beam Projector LED Headlight Assembly -->
        <g transform="translate(130, 85)">
          <!-- Headlight Polycarbonate Housing Casing -->
          <path d="M 30 70 C 120 30, 260 20, 330 60 C 350 140, 310 190, 260 210 C 150 230, 60 210, 20 160 Z" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2.5" />
          <!-- Crystal Clear Reflector Bowl -->
          <path d="M 45 80 C 130 45, 250 35, 310 70 C 325 130, 290 175, 250 190 C 150 210, 75 190, 40 145 Z" fill="#0F172A" stroke="#38BDF8" stroke-width="1" />
          <!-- Bi-Beam LED Projector Lens (Electric Blue Glow) -->
          <circle cx="130" cy="125" r="42" fill="#0284C7" stroke="#E0F2FE" stroke-width="3" />
          <circle cx="130" cy="125" r="28" fill="#38BDF8" opacity="0.9" />
          <circle cx="120" cy="115" r="8" fill="#FFFFFF" />
          <!-- Daytime Running Light (DRL) LED Strip Guide -->
          <path d="M 50 85 C 130 55, 230 48, 295 75" fill="none" stroke="#38BDF8" stroke-width="6" stroke-linecap="round" />
          <path d="M 50 85 C 130 55, 230 48, 295 75" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
          <!-- Turn Signal Amber Matrix Cluster -->
          <rect x="235" y="100" width="55" height="15" rx="3" fill="#D97706" stroke="#F59E0B" stroke-width="1.5" />
          <rect x="245" y="125" width="45" height="15" rx="3" fill="#D97706" stroke="#F59E0B" stroke-width="1.5" />
          <!-- High Beam Auxiliary Reflector -->
          <ellipse cx="205" cy="135" rx="22" ry="30" fill="url(#metalGrad)" stroke="#94A3B8" stroke-width="1.5" />
        </g>
      `;
      break;

    case 'compressor':
      partGraphic = `
        <!-- Denso AC Rotary Compressor -->
        <g transform="translate(150, 90)">
          <!-- Compressor Main Cylindrical Body -->
          <rect x="80" y="60" width="170" height="140" rx="24" fill="url(#metalGrad)" stroke="#475569" stroke-width="2" />
          <!-- Rear Cover Plate with Suction/Discharge Ports -->
          <path d="M 240 75 L 275 75 L 275 185 L 240 185 Z" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2" />
          <!-- High & Low Pressure Ports -->
          <rect x="265" y="90" width="30" height="22" rx="4" fill="#0284C7" stroke="#38BDF8" stroke-width="1.5" />
          <rect x="265" y="135" width="35" height="26" rx="4" fill="#DC2626" stroke="#F87171" stroke-width="1.5" />
          <!-- Front Snout Housing -->
          <path d="M 80 85 L 35 95 L 35 165 L 80 175 Z" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2" />
          <!-- Belt Pulley (Multi-Ribbed Serpentine) -->
          <rect x="15" y="70" width="28" height="120" rx="4" fill="url(#metalGrad)" stroke="#334155" stroke-width="2" />
          <line x1="22" y1="70" x2="22" y2="190" stroke="#0F172A" stroke-width="2" />
          <line x1="29" y1="70" x2="29" y2="190" stroke="#0F172A" stroke-width="2" />
          <!-- Magnetic Clutch Hub Plate -->
          <circle cx="15" cy="130" r="28" fill="url(#darkMetal)" stroke="#CBD5E1" stroke-width="2.5" />
          <circle cx="15" cy="130" r="10" fill="#E2E8F0" stroke="#475569" stroke-width="2" />
          <!-- Denso Label Plate -->
          <rect x="110" y="105" width="105" height="40" rx="4" fill="#0C4A6E" stroke="#0284C7" stroke-width="1.5" />
          <text x="162" y="125" fill="#F8FAFC" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">DENSO 6SEU</text>
          <text x="162" y="138" fill="#38BDF8" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">R134a REFRIGERANT</text>
        </g>
      `;
      break;

    case 'radiator':
      partGraphic = `
        <!-- Heavy-Duty Dual Core Aluminum Radiator -->
        <g transform="translate(150, 80)">
          <!-- Top Plastic Header Tank -->
          <rect x="25" y="20" width="250" height="35" rx="6" fill="url(#darkMetal)" stroke="#475569" stroke-width="2" />
          <!-- Radiator Cap Neck & Pressure Cap -->
          <rect x="65" y="5" width="30" height="18" rx="2" fill="#E2E8F0" stroke="#64748B" stroke-width="1.5" />
          <ellipse cx="80" cy="6" rx="22" ry="7" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
          <text x="80" y="9" fill="#78350F" font-family="sans-serif" font-size="6" font-weight="900" text-anchor="middle">1.1 BAR</text>
          <!-- Radiator Inlet Hose Neck -->
          <rect x="200" y="8" width="26" height="20" rx="3" fill="#334155" stroke="#94A3B8" stroke-width="2" />
          <!-- Aluminum Brazed Cooling Fin Core -->
          <rect x="35" y="55" width="230" height="170" fill="url(#metalGrad)" stroke="#94A3B8" stroke-width="1.5" />
          <!-- Cooling Tubes Grid Lines -->
          <line x1="35" y1="75" x2="265" y2="75" stroke="#334155" stroke-width="2" />
          <line x1="35" y1="95" x2="265" y2="95" stroke="#334155" stroke-width="2" />
          <line x1="35" y1="115" x2="265" y2="115" stroke="#334155" stroke-width="2" />
          <line x1="35" y1="135" x2="265" y2="135" stroke="#334155" stroke-width="2" />
          <line x1="35" y1="155" x2="265" y2="155" stroke="#334155" stroke-width="2" />
          <line x1="35" y1="175" x2="265" y2="175" stroke="#334155" stroke-width="2" />
          <line x1="35" y1="195" x2="265" y2="195" stroke="#334155" stroke-width="2" />
          <!-- Bottom Tank -->
          <rect x="25" y="225" width="250" height="35" rx="6" fill="url(#darkMetal)" stroke="#475569" stroke-width="2" />
          <!-- Bottom Drain Petcock -->
          <rect x="50" y="258" width="14" height="15" rx="2" fill="#E2E8F0" />
        </g>
      `;
      break;

    case 'ecu':
      partGraphic = `
        <!-- Engine ECU / ECM Management Computer -->
        <g transform="translate(150, 90)">
          <!-- Cast Aluminum Protective Casing -->
          <rect x="40" y="30" width="220" height="180" rx="10" fill="url(#metalGrad)" stroke="#64748B" stroke-width="2.5" />
          <!-- Mounting Brackets on corners -->
          <rect x="20" y="45" width="22" height="30" rx="3" fill="url(#darkMetal)" stroke="#475569" stroke-width="1.5" />
          <circle cx="30" cy="60" r="5" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <rect x="20" y="145" width="22" height="30" rx="3" fill="url(#darkMetal)" stroke="#475569" stroke-width="1.5" />
          <circle cx="30" cy="160" r="5" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <!-- High-Density Multi-Pin Terminal Headers -->
          <rect x="80" y="200" width="140" height="30" rx="4" fill="#0F172A" stroke="#38BDF8" stroke-width="1.5" />
          <rect x="90" y="208" width="30" height="14" fill="#1E293B" stroke="#94A3B8" stroke-width="1" />
          <rect x="130" y="208" width="40" height="14" fill="#1E293B" stroke="#94A3B8" stroke-width="1" />
          <rect x="180" y="208" width="30" height="14" fill="#1E293B" stroke="#94A3B8" stroke-width="1" />
          <!-- Denso Japan Label Sticker -->
          <rect x="70" y="60" width="160" height="90" rx="4" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
          <rect x="70" y="60" width="160" height="18" fill="#DC2626" />
          <text x="150" y="73" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="900" text-anchor="middle" letter-spacing="1">DENSO JAPAN</text>
          <text x="85" y="96" fill="#0F172A" font-family="monospace" font-size="11" font-weight="bold">ENGINE CONTROL</text>
          <text x="85" y="112" fill="#475569" font-family="monospace" font-size="10 font-weight="bold">${oem}</text>
          <!-- Barcode on sticker -->
          <rect x="85" y="122" width="2" height="16" fill="#0F172A" />
          <rect x="89" y="122" width="4" height="16" fill="#0F172A" />
          <rect x="96" y="122" width="1" height="16" fill="#0F172A" />
          <rect x="100" y="122" width="3" height="16" fill="#0F172A" />
          <rect x="106" y="122" width="5" height="16" fill="#0F172A" />
          <rect x="114" y="122" width="2" height="16" fill="#0F172A" />
          <rect x="118" y="122" width="4" height="16" fill="#0F172A" />
          <rect x="125" y="122" width="1" height="16" fill="#0F172A" />
          <rect x="128" y="122" width="4" height="16" fill="#0F172A" />
        </g>
      `;
      break;

    case 'alternator':
      partGraphic = `
        <!-- High-Output Alternator Generator -->
        <g transform="translate(160, 85)">
          <!-- Main Stator Aluminum Casing -->
          <circle cx="130" cy="130" r="95" fill="url(#metalGrad)" stroke="#475569" stroke-width="2" />
          <!-- Ventilation Cooling Slots -->
          <path d="M 60 110 L 85 110" stroke="#0F172A" stroke-width="4" stroke-linecap="round" />
          <path d="M 60 130 L 85 130" stroke="#0F172A" stroke-width="4" stroke-linecap="round" />
          <path d="M 60 150 L 85 150" stroke="#0F172A" stroke-width="4" stroke-linecap="round" />
          <path d="M 175 110 L 200 110" stroke="#0F172A" stroke-width="4" stroke-linecap="round" />
          <path d="M 175 130 L 200 130" stroke="#0F172A" stroke-width="4" stroke-linecap="round" />
          <path d="M 175 150 L 200 150" stroke="#0F172A" stroke-width="4" stroke-linecap="round" />
          <!-- Internal Copper Windings Glow -->
          <circle cx="130" cy="130" r="60" fill="url(#copperGrad)" stroke="#B45309" stroke-width="3" />
          <!-- Front Bearing & Rotor Shaft -->
          <circle cx="130" cy="130" r="35" fill="url(#darkMetal)" stroke="#CBD5E1" stroke-width="2.5" />
          <!-- Serpentine Drive Pulley -->
          <circle cx="130" cy="130" r="22" fill="#E2E8F0" stroke="#1E293B" stroke-width="2" />
          <circle cx="130" cy="130" r="8" fill="#0F172A" />
          <!-- Mounting Feet Ears -->
          <path d="M 45 45 L 85 65 L 65 95 Z" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2" />
          <circle cx="60" cy="65" r="7" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <path d="M 175 200 L 215 210 L 205 175 Z" fill="url(#darkMetal)" stroke="#64748B" stroke-width="2" />
          <circle cx="198" cy="195" r="7" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
        </g>
      `;
      break;

    default:
      // Generic high-grade automotive spare part
      partGraphic = `
        <g transform="translate(170, 90)">
          <!-- High Strength Alloy Part Box -->
          <rect x="40" y="40" width="180" height="150" rx="12" fill="url(#metalGrad)" stroke="#64748B" stroke-width="2.5" />
          <!-- Center Mechanism Details -->
          <circle cx="130" cy="115" r="45" fill="url(#darkMetal)" stroke="#DC2626" stroke-width="3" />
          <circle cx="130" cy="115" r="25" fill="#0F172A" stroke="#CBD5E1" stroke-width="2" />
          <circle cx="130" cy="115" r="10" fill="#DC2626" />
          <rect x="70" y="20" width="120" height="24" rx="4" fill="url(#darkMetal)" stroke="#475569" stroke-width="2" />
          <!-- High-Grade Metal Bolts -->
          <circle cx="65" cy="65" r="6" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="195" cy="65" r="6" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="65" cy="165" r="6" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
          <circle cx="195" cy="165" r="6" fill="#0F172A" stroke="#E2E8F0" stroke-width="2" />
        </g>
      `;
  }

  const svgFull = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      ${baseBg}
      ${partGraphic}
      ${overlayStamp}
    </svg>
  `;

  return svgToDataUri(svgFull);
}
