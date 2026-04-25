import React from 'react';
import {
  Svg,
  Path,
  Circle,
  Line,
  Polyline,
  SvgProps as RNSvgProps,
} from 'react-native-svg';
import { cssInterop } from 'nativewind';

interface SvgProps extends RNSvgProps {
  className?: string;
}

/**
 * Define the list of available icons here.
 * We use explicit stroke={props.color} to ensure colors work correctly in React Native.
 */
const ICON_LIST = {
  home: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <Path d="M9 22V12h6v10" />
    </Svg>
  ),
  search: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Circle cx="11" cy="11" r="8" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Svg>
  ),
  play: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M5 3l14 9-14 9V3z" />
    </Svg>
  ),
  download: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <Polyline points="7 10 12 15 17 10" />
      <Line x1="12" y1="15" x2="12" y2="3" />
    </Svg>
  ),
  user: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <Circle cx="12" cy="7" r="4" />
    </Svg>
  ),
  settings: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Circle cx="12" cy="12" r="3" />
      <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </Svg>
  ),
  chevronRight: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Polyline points="9 18 15 12 9 6" />
    </Svg>
  ),
  chevronLeft: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Polyline points="15 18 9 12 15 6" />
    </Svg>
  ),
  toolKit: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3"></Path>
    </Svg>
  ),
  platter: (props: SvgProps) => (
    <Svg viewBox="0 0 512 512" fill={props.color || '#000000'} {...props}>
      <Path d="M494.09,366.699c-2.43-59.943-26.911-115.949-69.583-158.621c-29.526-29.526-65.434-50.349-104.614-61.183    c-2.49-33.083-30.184-59.246-63.893-59.246c-33.709,0-61.403,26.162-63.893,59.246c-39.18,10.834-75.089,31.657-104.614,61.183    C44.82,250.749,20.341,306.756,17.91,366.699C7.768,368.376,0,377.183,0,387.792v15.153c0,11.802,9.603,21.405,21.405,21.405    h469.189c11.802,0,21.405-9.603,21.405-21.405v-15.153C512,377.183,504.232,368.376,494.09,366.699z M256,108.048    c20.769,0,38.187,14.569,42.603,34.019c-13.92-2.499-28.162-3.788-42.603-3.788s-28.683,1.289-42.603,3.788    C217.813,122.617,235.231,108.048,256,108.048z M256,158.678c116.738,0,212.33,92.269,217.672,207.709H38.328    C43.67,250.947,139.262,158.678,256,158.678z M491.602,402.945c0,0.555-0.452,1.007-1.007,1.007H21.405    c-0.555,0-1.007-0.452-1.007-1.007v-15.153c0-0.555,0.452-1.007,1.007-1.007h469.19c0.555,0,1.007,0.452,1.007,1.007V402.945z" />
      <Path d="M456.957,338.209c-5.623-29.609-18.052-58.147-35.943-82.527c-3.334-4.542-9.717-5.522-14.258-2.189    c-4.542,3.333-5.521,9.716-2.189,14.257c16.335,22.258,27.219,47.244,32.35,74.263c0.928,4.891,5.206,8.298,10.008,8.298    c0.63,0,1.271-0.059,1.913-0.182C454.375,349.08,458.008,343.742,456.957,338.209z" />
      <Path d="M399.159,230.481c-2.201-2.159-4.485-4.298-6.789-6.36c-4.194-3.755-10.645-3.4-14.401,0.797    c-3.758,4.197-3.401,10.645,0.796,14.402c2.076,1.858,4.134,3.786,6.115,5.729c1.985,1.946,4.563,2.915,7.138,2.915    c2.645,0,5.288-1.022,7.285-3.06C403.247,240.881,403.183,234.424,399.159,230.481z" />
    </Svg>
  ),
  calendar: (props: SvgProps) => (
    <Svg viewBox="0 0 24 24" fill={props.color || '#000000'} {...props}>
      <Path
        d="M18.438,4.954H16.5c0-0.346,0-0.691,0-1.036c0-0.124,0-0.248,0-0.372c0-0.262-0.23-0.512-0.5-0.5
            c-0.271,0.012-0.5,0.22-0.5,0.5c0,0.469,0,0.939,0,1.408h-7c0-0.346,0-0.691,0-1.036c0-0.124,0-0.248,0-0.372
            c0-0.262-0.23-0.512-0.5-0.5c-0.271,0.012-0.5,0.22-0.5,0.5c0,0.469,0,0.939,0,1.408H5.562c-1.378,0-2.5,1.122-2.5,2.5v11
            c0,1.379,1.122,2.5,2.5,2.5h12.875c1.379,0,2.5-1.121,2.5-2.5v-11C20.938,6.076,19.816,4.954,18.438,4.954z M5.562,5.954H7.5
            c0,0.073,0,0.147,0,0.22c0,0.124,0,0.248,0,0.372c0,0.262,0.23,0.512,0.5,0.5c0.271-0.012,0.5-0.22,0.5-0.5c0-0.197,0-0.394,0-0.592
            h7c0,0.073,0,0.147,0,0.22c0,0.124,0,0.248,0,0.372c0,0.262,0.23,0.512,0.5,0.5c0.271-0.012,0.5-0.22,0.5-0.5
            c0-0.197,0-0.394,0-0.592h1.937c0.827,0,1.5,0.673,1.5,1.5v1.584H4.062V7.454C4.062,6.627,4.735,5.954,5.562,5.954z M18.438,19.954
            H5.562c-0.827,0-1.5-0.673-1.5-1.5v-8.416h15.875v8.416C19.938,19.281,19.265,19.954,18.438,19.954z"
      ></Path>
    </Svg>
  ),
  users: (props: SvgProps) => (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <Circle cx="9" cy="7" r="4" />
      <Path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Svg>
  ),
};

// Register Svg with NativeWind to support className
cssInterop(Svg, {
  className: {
    target: 'style',
  },
});

export type IconName = keyof typeof ICON_LIST;

interface IconProps extends RNSvgProps {
  name: IconName;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  className,
  size = 24,
  color = 'currentColor',
  ...props
}) => {
  const IconComponent = ICON_LIST[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      color={color}
      className={className}
      {...props}
    />
  );
};

export default Icon;
