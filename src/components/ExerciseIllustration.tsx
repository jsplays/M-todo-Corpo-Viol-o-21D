import React from 'react';

interface Props {
  visualKey: string;
  isEasierVersion?: boolean;
  className?: string;
}

export const ExerciseIllustration: React.FC<Props> = ({ visualKey, isEasierVersion = false, className = 'w-full h-48' }) => {
  // Color palette for anatomical figures
  const strokeColor = '#334155'; // slate-700
  const fillColor = '#e2e8f0'; // slate-200
  const accentColor = '#059669'; // emerald-600
  const propColor = '#94a3b8'; // slate-400

  const renderIllustration = () => {
    switch (visualKey) {
      case 'chair_squat':
      case 'sit_to_stand':
      case 'chair_squat_light':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Floor line */}
            <line x1="20" y1="140" x2="180" y2="140" stroke={propColor} strokeWidth="2" strokeDasharray="4 4" />
            {/* Chair */}
            <path d="M125 75 L155 75 L155 140 M125 75 L125 140 M155 75 L155 45" stroke={propColor} strokeWidth="3" />
            <rect x="120" y="72" width="38" height="6" rx="2" fill={propColor} />
            {/* Human in squat position */}
            {/* Head */}
            <circle cx="85" cy="45" r="10" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            {/* Torso inclined */}
            <line x1="85" y1="55" x2="100" y2="85" stroke={strokeColor} strokeWidth="3.5" />
            {/* Thigh (horizontal-ish to chair) */}
            <line x1="100" y1="85" x2="78" y2="105" stroke={strokeColor} strokeWidth="3.5" />
            {/* Lower leg */}
            <line x1="78" y1="105" x2="80" y2="140" stroke={strokeColor} strokeWidth="3.5" />
            {/* Foot */}
            <line x1="75" y1="140" x2="92" y2="140" stroke={strokeColor} strokeWidth="3.5" />
            {/* Arms reaching forward for balance */}
            <path d="M88 62 L60 70 L48 72" stroke={strokeColor} strokeWidth="2.5" />
            {/* Muscle focus highlight (glute & quads) */}
            <circle cx="100" cy="85" r="5" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
            <circle cx="89" cy="95" r="4" fill={accentColor} fillOpacity="0.3" />
            {/* Direction cue arrow */}
            <path d="M108 72 C108 78 114 82 118 84" stroke={accentColor} strokeWidth="2" strokeDasharray="2 2" />
          </svg>
        );

      case 'glute_bridge':
      case 'glute_bridge_pause':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Floor line */}
            <line x1="20" y1="130" x2="180" y2="130" stroke={propColor} strokeWidth="2" strokeDasharray="4 4" />
            {/* Head on floor */}
            <circle cx="45" cy="120" r="9" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            {/* Upper back on floor */}
            <line x1="54" y1="124" x2="75" y2="124" stroke={strokeColor} strokeWidth="3" />
            {/* Torso elevated toward hips */}
            <line x1="75" y1="124" x2="108" y2={isEasierVersion ? "110" : "95"} stroke={strokeColor} strokeWidth="3.5" />
            {/* Thighs from hip to knees */}
            <line x1="108" y1={isEasierVersion ? "110" : "95"} x2="140" y2="108" stroke={strokeColor} strokeWidth="3.5" />
            {/* Lower legs down to feet */}
            <line x1="140" y1="108" x2="144" y2="130" stroke={strokeColor} strokeWidth="3.5" />
            {/* Feet */}
            <line x1="138" y1="130" x2="154" y2="130" stroke={strokeColor} strokeWidth="3.5" />
            {/* Arms relaxed at sides */}
            <line x1="68" y1="126" x2="105" y2="128" stroke={strokeColor} strokeWidth="2.5" />
            {/* Glute contraction highlight */}
            <circle cx="108" cy={isEasierVersion ? "110" : "95"} r="6" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
            {/* Elevation arrow */}
            <path d="M108 122 L108 102 M105 106 L108 100 L111 106" stroke={accentColor} strokeWidth="2" />
          </svg>
        );

      case 'wall_pushup':
      case 'incline_pushup':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Wall */}
            <line x1="150" y1="20" x2="150" y2="145" stroke={propColor} strokeWidth="4" />
            {/* Floor */}
            <line x1="20" y1="145" x2="170" y2="145" stroke={propColor} strokeWidth="2" />
            {/* Head */}
            <circle cx={isEasierVersion ? "120" : "105"} cy="48" r="9" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            {/* Straight body line (head-torso-legs) */}
            <line x1={isEasierVersion ? "118" : "100"} y1="57" x2={isEasierVersion ? "90" : "65"} y2="145" stroke={strokeColor} strokeWidth="3.5" />
            {/* Arms extending to wall */}
            <path d={isEasierVersion ? "M115 65 L135 70 L150 72" : "M100 68 L126 76 L150 75"} stroke={strokeColor} strokeWidth="3" />
            {/* Feet on floor */}
            <line x1={isEasierVersion ? "84" : "59"} y1="145" x2={isEasierVersion ? "95" : "70"} y2="145" stroke={strokeColor} strokeWidth="3.5" />
            {/* Chest & core stability accent */}
            <circle cx={isEasierVersion ? "115" : "98"} cy="70" r="5" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
            {/* Push/pull motion cues */}
            <path d="M125 82 L138 82 M134 78 L140 82 L134 86" stroke={accentColor} strokeWidth="1.5" />
          </svg>
        );

      case 'dead_bug':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Floor */}
            <line x1="20" y1="120" x2="180" y2="120" stroke={propColor} strokeWidth="2" strokeDasharray="4 4" />
            {/* Head */}
            <circle cx="50" cy="112" r="9" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            {/* Spine flat on floor */}
            <line x1="58" y1="116" x2="105" y2="116" stroke={strokeColor} strokeWidth="3.5" />
            {/* Arms up */}
            <line x1="75" y1="116" x2="70" y2="70" stroke={strokeColor} strokeWidth="2.5" />
            <line x1="75" y1="116" x2="80" y2="75" stroke={strokeColor} strokeWidth="2" strokeDasharray="3 3" />
            {/* Hips to knees (90 deg) */}
            <line x1="105" y1="116" x2="115" y2="82" stroke={strokeColor} strokeWidth="3.5" />
            <line x1="115" y1="82" x2="145" y2="82" stroke={strokeColor} strokeWidth="3" />
            {/* Alternating leg descending */}
            <line x1="105" y1="116" x2="132" y2="108" stroke={strokeColor} strokeWidth="2.5" strokeDasharray="2 2" />
            <line x1="132" y1="108" x2="155" y2="118" stroke={strokeColor} strokeWidth="2.5" />
            {/* Core stabilization zone */}
            <circle cx="90" cy="114" r="6" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
          </svg>
        );

      case 'supported_lunge':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Floor */}
            <line x1="20" y1="140" x2="180" y2="140" stroke={propColor} strokeWidth="2" />
            {/* Support Chair/Post */}
            <path d="M140 60 L140 140 M140 85 L160 85 L160 140" stroke={propColor} strokeWidth="2.5" />
            {/* Head */}
            <circle cx="105" cy="42" r="9" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            {/* Torso upright */}
            <line x1="105" y1="51" x2="105" y2="92" stroke={strokeColor} strokeWidth="3.5" />
            {/* Arm reaching for support */}
            <path d="M106 60 L124 68 L140 70" stroke={strokeColor} strokeWidth="2.5" />
            {/* Front Leg bent */}
            <line x1="105" y1="92" x2="118" y2="114" stroke={strokeColor} strokeWidth="3.5" />
            <line x1="118" y1="114" x2="118" y2="140" stroke={strokeColor} strokeWidth="3.5" />
            <line x1="116" y1="140" x2="128" y2="140" stroke={strokeColor} strokeWidth="3" />
            {/* Back Leg stepped back */}
            <line x1="105" y1="92" x2="78" y2="118" stroke={strokeColor} strokeWidth="3" />
            <line x1="78" y1="118" x2="68" y2="138" stroke={strokeColor} strokeWidth="3" />
            <line x1="65" y1="138" x2="74" y2="138" stroke={strokeColor} strokeWidth="3" />
            {/* Focus on hip & front thigh */}
            <circle cx="105" cy="95" r="5" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
          </svg>
        );

      case 'hip_hinge':
      case 'hip_hinge_light':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Floor */}
            <line x1="20" y1="140" x2="180" y2="140" stroke={propColor} strokeWidth="2" />
            {/* Optional Wall guide behind */}
            <line x1="45" y1="30" x2="45" y2="140" stroke={propColor} strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Head */}
            <circle cx="120" cy="58" r="9" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            {/* Torso inclined straight */}
            <line x1="113" y1="64" x2="70" y2="88" stroke={strokeColor} strokeWidth="3.5" />
            {/* Thighs pushed back */}
            <line x1="70" y1="88" x2="76" y2="116" stroke={strokeColor} strokeWidth="3.5" />
            {/* Lower legs almost vertical */}
            <line x1="76" y1="116" x2="78" y2="140" stroke={strokeColor} strokeWidth="3.5" />
            <line x1="75" y1="140" x2="90" y2="140" stroke={strokeColor} strokeWidth="3" />
            {/* Arms relaxed hanging down or on hips */}
            <path d="M100 70 L95 105" stroke={strokeColor} strokeWidth="2.5" />
            {/* Posterior chain activation */}
            <circle cx="70" cy="88" r="6" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
            <path d="M68 85 C62 88 56 88 50 88" stroke={accentColor} strokeWidth="2" strokeDasharray="2 2" />
          </svg>
        );

      case 'bird_dog':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Floor */}
            <line x1="20" y1="130" x2="180" y2="130" stroke={propColor} strokeWidth="2" strokeDasharray="4 4" />
            {/* Head looking down */}
            <circle cx="140" cy="80" r="8" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            {/* Flat spine */}
            <line x1="134" y1="88" x2="82" y2="88" stroke={strokeColor} strokeWidth="3.5" />
            {/* Supporting arm */}
            <line x1="130" y1="88" x2="130" y2="130" stroke={strokeColor} strokeWidth="3" />
            {/* Extended opposite arm (or tucked if easier) */}
            <line x1="130" y1="88" x2={isEasierVersion ? "130" : "168"} y2={isEasierVersion ? "130" : "88"} stroke={strokeColor} strokeWidth={isEasierVersion ? "1.5" : "2.5"} />
            {/* Supporting knee */}
            <line x1="90" y1="88" x2="90" y2="130" stroke={strokeColor} strokeWidth="3" />
            {/* Extended back leg */}
            <line x1="82" y1="88" x2={isEasierVersion ? "55" : "38"} y2={isEasierVersion ? "115" : "90"} stroke={strokeColor} strokeWidth="3.5" />
            {/* Lumbar & glute stability */}
            <circle cx="85" cy="88" r="5" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
          </svg>
        );

      case 'side_leg_raise':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Floor */}
            <line x1="20" y1="130" x2="180" y2="130" stroke={propColor} strokeWidth="2" strokeDasharray="4 4" />
            {/* Head resting on arm */}
            <circle cx="48" cy="115" r="8" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            {/* Torso straight on floor */}
            <line x1="56" y1="120" x2="105" y2="120" stroke={strokeColor} strokeWidth="3.5" />
            {/* Bottom leg on floor */}
            <line x1="105" y1="120" x2="160" y2="126" stroke={strokeColor} strokeWidth="3" />
            {/* Top leg elevated */}
            <line x1="105" y1="118" x2="162" y2={isEasierVersion ? "100" : "85"} stroke={strokeColor} strokeWidth="3.5" />
            {/* Gluteus medius target */}
            <circle cx="106" cy="115" r="6" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
            {/* Lift arc */}
            <path d="M152 115 C158 110 160 102 160 92" stroke={accentColor} strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        );

      case 'side_plank_knees':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Floor */}
            <line x1="20" y1="135" x2="180" y2="135" stroke={propColor} strokeWidth="2" strokeDasharray="4 4" />
            {/* Forearm on floor */}
            <line x1="55" y1="135" x2="75" y2="135" stroke={strokeColor} strokeWidth="3.5" />
            <line x1="75" y1="135" x2="75" y2="105" stroke={strokeColor} strokeWidth="3.5" />
            {/* Head */}
            <circle cx="65" cy="85" r="8" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            {/* Torso elevated (or on floor if easier) */}
            <line x1="75" y1="105" x2="120" y2={isEasierVersion ? "130" : "110"} stroke={strokeColor} strokeWidth="3.5" />
            {/* Thighs to bent knees */}
            <line x1="120" y1={isEasierVersion ? "130" : "110"} x2="148" y2="135" stroke={strokeColor} strokeWidth="3.5" />
            {/* Knees bent backwards */}
            <line x1="148" y1="135" x2="162" y2="122" stroke={strokeColor} strokeWidth="3" />
            {/* Oblique & core lateral highlight */}
            <circle cx="95" cy={isEasierVersion ? "122" : "108"} r="6" fill={accentColor} fillOpacity="0.4" stroke={accentColor} strokeWidth="1.5" />
          </svg>
        );

      case 'marching':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="40" y1="140" x2="160" y2="140" stroke={propColor} strokeWidth="2" />
            <circle cx="100" cy="38" r="9" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            <line x1="100" y1="47" x2="100" y2="92" stroke={strokeColor} strokeWidth="3.5" />
            {/* Left leg standing */}
            <line x1="100" y1="92" x2="94" y2="140" stroke={strokeColor} strokeWidth="3.5" />
            {/* Right leg marching knee up */}
            <line x1="100" y1="92" x2="118" y2="102" stroke={strokeColor} strokeWidth="3.5" />
            <line x1="118" y1="102" x2="118" y2="122" stroke={strokeColor} strokeWidth="3" />
            {/* Gentle arm swing */}
            <path d="M100 58 L85 75 L76 72" stroke={strokeColor} strokeWidth="2.5" />
            <path d="M100 58 L116 75 L124 72" stroke={strokeColor} strokeWidth="2.5" />
          </svg>
        );

      case 'shoulder_circles':
        return (
          <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="40" y1="140" x2="160" y2="140" stroke={propColor} strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="38" r="9" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
            <line x1="100" y1="47" x2="100" y2="105" stroke={strokeColor} strokeWidth="3.5" />
            <line x1="100" y1="105" x2="90" y2="140" stroke={strokeColor} strokeWidth="3.5" />
            <line x1="100" y1="105" x2="110" y2="140" stroke={strokeColor} strokeWidth="3.5" />
            {/* Gentle circle arcs around shoulders */}
            <ellipse cx="80" cy="62" rx="14" ry="10" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 2" />
            <ellipse cx="120" cy="62" rx="14" ry="10" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
            Movimento guiado
          </div>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center bg-stone-100/70 rounded-2xl p-4 overflow-hidden border border-stone-200/60 ${className}`}>
      {renderIllustration()}
      {isEasierVersion && (
        <span className="absolute top-2.5 right-2.5 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/70 rounded-md px-2 py-0.5 shadow-xs">
          Versão Adaptada
        </span>
      )}
    </div>
  );
};
