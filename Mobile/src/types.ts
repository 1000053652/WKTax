import type {
  ListingCompatabilityFilters as GraphListingCompatabilityFilters,
  LocationSuggestion as GraphLocationSuggestion,
  VenueType,
} from '@adc/sdk/types'

export type ListingCompatabilityFilters = GraphListingCompatabilityFilters & {
  // NOTE: You read that right, we _are_ using a literal as a type here. The Graph API mandates this always be here but
  // only at runtime, so we force it to be ain all types the app uses to keep type safety
  version: 1
}

// NOTE: I've named this for what this particular app supports because some other suggestion components
// in the company support more suggestions, like zip codes or address suggestions.
export type SupportedAppLocationSuggestion = Pick<
  GraphLocationSuggestion,
  'city' | 'state' | 'type' | 'county' | 'value' | 'zip'
>

export type Maybe<T> = T | null

export interface BaseProps {
  testID?: string
  accessibilityLabel?: string
  accessibilityHint?: string
}

export enum Rounded {
  All = 'all',
  Bottom = 'bottom',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight',
  Left = 'left',
  Right = 'right',
  Top = 'top',
  TopLeft = 'topLeft',
  TopRight = 'topRight',
}

export type BorderRadiusStyle = {
  borderRadius?: number
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
}

export interface Expression {
  range?: {
    field: string
    gte?: string
    lte?: string
    values?: boolean | string | number
  }
  equals?: {
    fields: string
    values: boolean | string | number | VenueType | string[]
  }
  geo_distance_range?: {
    field: string
    lte: string
    center: {
      lat: string
      lon: string
    }
  }
}

export interface IndexSearchExpressions {
  query: { and: { expressions: Expression[] } }
}
