/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiCaseData {
  count?: number;
  itemCode?: string;
  skills?: Record<string, Record<string, number>>;
}

export interface ApiCountryData {
  countryId?: string;
  incomeTaxPercentage?: number;
  industrialism?: number;
  name?: string;
  productionBonusPercentage?: number;
  regions?: ApiDepositData[];
  selfworkTaxPercentage?: number;
  specializedItemCode?: string;
}

export interface ApiCountryTaxPaidData {
  countryId?: string;
  entries?: ApiCountryTaxPaidEntry[];
  from?: number;
  to?: number;
}

export interface ApiCountryTaxPaidEntry {
  companies?: number;
  core?: boolean;
  itemCode?: string;
  ownerCountryId?: string;
  regionId?: string;
  taxRate?: number;
  taxes?: number;
  wages?: number;
}

export interface ApiCountryTradeData {
  created?: number;
  item?: string;
  money?: number;
  quantity?: number;
  side?: string;
}

export interface ApiDepositData {
  bonusPercentage?: number;
  depositItemCode?: string;
  endsAtUTC?: number;
  regionId?: string;
  regionName?: string;
}

export interface ApiDismantlesData {
  itemCode?: string;
  /** r[state] = [scrap, count] */
  rewards?: Record<string, number[]>;
}

export interface ApiEquipmentData {
  itemCode?: string;
  recentTransactions?: ApiEquipmentTransaction[];
  variants?: ApiEquipmentVariant[];
}

export interface ApiEquipmentTransaction {
  buyerId?: string;
  itemCode?: string;
  money?: number;
  sellerId?: string;
  skills?: Record<string, number>;
  soldAt?: number;
  timeTillSale?: number;
}

export interface ApiEquipmentVariant {
  avgPrice?: number;
  fromTime?: number;
  maxPrice?: number;
  minPrice?: number;
  sampleCount?: number;
  skillCount?: number;
  skills?: Record<string, number>;
  toTime?: number;
  updatedAt?: number;
}

export interface ApiEquipmentsData {
  avgPrice?: number;
  itemCode?: string;
  maxPrice?: number;
  minPrice?: number;
  totalTransactionsRecorded?: number;
}

export interface ApiErrorData {
  error?: string;
}

export interface ApiHomeData {
  inflation?: number[];
  labour24hrs?: number;
  maxWage?: number;
  minWage?: number;
  trades?: ApiHomeDataTrade[];
  vol24hrs?: number;
  wage24hrs?: number;
}

export interface ApiHomeDataTrade {
  itemCode?: string;
  paid?: number;
  price?: number;
  quantity?: number;
  time?: number;
}

export interface ApiItemData {
  averagePrice?: number;
  candleData?: ApiItemDataCandleStick[];
  effectivePrices?: Record<string, ApiItemDataEffectivePrice>;
  high?: number;
  low?: number;
  orderbook?: ApiItemDataOrderBook;
  price?: number;
  recentTransactions?: ApiItemDataTransaction[];
  volume?: number;
}

export interface ApiItemDataCandleStick {
  close?: number;
  high?: number;
  low?: number;
  open?: number;
  timestamp?: number;
  volume?: number;
}

export interface ApiItemDataEffectivePrice {
  buy?: number;
  sell?: number;
}

export interface ApiItemDataOrderBook {
  buy?: ApiItemDataOrderBookItem[];
  sell?: ApiItemDataOrderBookItem[];
}

export interface ApiItemDataOrderBookItem {
  price?: number;
  quantity?: number;
}

export interface ApiItemDataTransaction {
  amountPaid?: number;
  buyerId?: string;
  quantity?: number;
  sellerId?: string;
  timeTillSale?: number;
  transactionTime?: number;
}

export interface ApiItemsItemData {
  avg?: number;
  change?: number;
  itemCode?: string;
  points?: number[];
  vol?: number;
}

export interface ApiUserData {
  avatarUrl?: string;
  userId?: string;
  username?: string;
}

export interface ApiWageData {
  averagePrice?: number;
  candleData?: number[][];
  high?: number;
  highest?: ApiWageDataTransaction[];
  low?: number;
  lowest?: ApiWageDataTransaction[];
  volume?: number;
}

export interface ApiWageDataTransaction {
  employeeId?: string;
  time?: number;
  wage?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "//api.warerastats.io";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title War Era stats API
 * @version 1.0
 * @baseUrl //api.warerastats.io
 * @contact
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  cases = {
    /**
     * @description Returns aggregated case opening results grouped by case type, showing item drop counts and associated skill distributions
     *
     * @tags Cases
     * @name CasesList
     * @summary Get case opening results
     * @request GET:/cases
     */
    casesList: (params: RequestParams = {}) =>
      this.request<Record<string, ApiCaseData[]>, ApiErrorData>({
        path: `/cases`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  countries = {
    /**
     * @description Returns a list of all countries with their tax rates, production bonuses, specialized items, region deposits and ruling party industrialism level
     *
     * @tags Countries
     * @name CountriesList
     * @summary Get all countries
     * @request GET:/countries
     */
    countriesList: (params: RequestParams = {}) =>
      this.request<ApiCountryData[], ApiErrorData>({
        path: `/countries`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  countryTaxPaid = {
    /**
     * @description Returns aggregated tax and wage data for a country within a given time range, grouped by region and item code. Optionally filter by a specific item code.
     *
     * @tags Countries
     * @name CountryTaxPaidDetail
     * @summary Get country tax paid data
     * @request GET:/country-tax-paid/{countryId}
     */
    countryTaxPaidDetail: (
      countryId: string,
      query: {
        /** Start timestamp (unix seconds) */
        from: number;
        /** End timestamp (unix seconds) */
        to: number;
        /** Optional item code filter */
        item?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiCountryTaxPaidData, ApiErrorData>({
        path: `/country-tax-paid/${countryId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  countryTrades = {
    /**
     * @description Returns up to 10000 recent trades involving a specific country, indicating whether the country was the buyer or seller
     *
     * @tags Countries
     * @name CountryTradesDetail
     * @summary Get country trades
     * @request GET:/country-trades/{code}
     */
    countryTradesDetail: (code: string, params: RequestParams = {}) =>
      this.request<ApiCountryTradeData[], ApiErrorData>({
        path: `/country-trades/${code}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  dismantles = {
    /**
     * @description Returns aggregated dismantle results showing scrap rewards per item code and equipment state
     *
     * @tags Dismantles
     * @name DismantlesList
     * @summary Get dismantle results
     * @request GET:/dismantles
     */
    dismantlesList: (params: RequestParams = {}) =>
      this.request<ApiDismantlesData[], ApiErrorData>({
        path: `/dismantles`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  equipment = {
    /**
     * @description Returns detailed data for a specific equipment type including skill variants with price statistics and recent transactions
     *
     * @tags Equipment
     * @name EquipmentDetail
     * @summary Get equipment details
     * @request GET:/equipment/{code}
     */
    equipmentDetail: (code: string, params: RequestParams = {}) =>
      this.request<ApiEquipmentData, ApiErrorData>({
        path: `/equipment/${code}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  equipments = {
    /**
     * @description Returns an overview of all equipment types with total transaction counts, average price, minimum price and maximum price
     *
     * @tags Equipment
     * @name EquipmentsList
     * @summary Get all equipment types
     * @request GET:/equipments
     */
    equipmentsList: (params: RequestParams = {}) =>
      this.request<ApiEquipmentsData[], ApiErrorData>({
        path: `/equipments`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  home = {
    /**
     * @description Returns an overview of wage statistics, trade volume, inflation data and the 8 most recent trades
     *
     * @tags Home
     * @name HomeList
     * @summary Get home page data
     * @request GET:/home
     */
    homeList: (params: RequestParams = {}) =>
      this.request<ApiHomeData, ApiErrorData>({
        path: `/home`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  item = {
    /**
     * @description Returns detailed data for a specific item including price, candle stick chart data, effective prices at various depths, the current order book and recent transactions
     *
     * @tags Items
     * @name ItemDetail
     * @summary Get item details
     * @request GET:/item/{code}
     */
    itemDetail: (code: string, params: RequestParams = {}) =>
      this.request<ApiItemData, ApiErrorData>({
        path: `/item/${code}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  items = {
    /**
     * @description Returns a list of all tradeable items with their weighted average price, 24 hour volume, 24 hour price change and chart data points
     *
     * @tags Items
     * @name ItemsList
     * @summary Get all items
     * @request GET:/items
     */
    itemsList: (params: RequestParams = {}) =>
      this.request<ApiItemsItemData[], ApiErrorData>({
        path: `/items`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Returns user data for the given user IDs. Accepts one or more id query parameters. Results are cached and unknown IDs are fetched from the War Era API.
     *
     * @tags Users
     * @name UsersList
     * @summary Look up users
     * @request GET:/users
     */
    usersList: (
      query: {
        /** User ID (24 character hex string). Can be repeated for multiple lookups. */
        id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiUserData[], ApiErrorData>({
        path: `/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  wages = {
    /**
     * @description Returns wage statistics for the last 14 days including average price, low, high, volume, candle stick chart data, the 10 highest paid wages and the 10 lowest paid wages
     *
     * @tags Wages
     * @name WagesList
     * @summary Get wage data
     * @request GET:/wages
     */
    wagesList: (params: RequestParams = {}) =>
      this.request<ApiWageData, ApiErrorData>({
        path: `/wages`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
