import React, { useState } from 'react';
import { generatePartSvg } from '../utils/partSvgRenders';

export default function AutoPartImage({ 
  src, 
  alt = 'Auto Spare Part', 
  category = '', 
  name = '', 
  oem = 'OEM-PART',
  className = '' 
}) {
  const [hasError, setHasError] = useState(false);

  // Determine part visual type from name or category
  const getVisualType = () => {
    const text = (name + ' ' + category).toLowerCase();
    if (text.includes('gearbox') || text.includes('transmission')) return 'gearbox';
    if (text.includes('engine') || text.includes('cylinder') || text.includes('turbo') || text.includes('injector')) return 'engine';
    if (text.includes('shock') || text.includes('strut') || text.includes('suspension') || text.includes('control arm') || text.includes('steering')) return 'shock';
    if (text.includes('brake') || text.includes('rotor') || text.includes('pad') || text.includes('abs') || text.includes('drum')) return 'brake';
    if (text.includes('headlight') || text.includes('lamp') || text.includes('lighting') || text.includes('light') || text.includes('tail') || text.includes('mirror') || text.includes('bumper')) return 'headlight';
    if (text.includes('compressor') || text.includes('cooling coil')) return 'compressor';
    if (text.includes('radiator') || text.includes('condenser') || text.includes('ac')) return 'radiator';
    if (text.includes('ecu') || text.includes('computer') || text.includes('sensor')) return 'ecu';
    if (text.includes('alternator') || text.includes('starter') || text.includes('electrical')) return 'alternator';
    return 'generic';
  };

  // Generate fallback SVG data URI
  const fallbackSvgUri = generatePartSvg(getVisualType(), name, oem);

  const imageSource = (!src || hasError) ? fallbackSvgUri : src;

  return (
    <img
      src={imageSource}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
