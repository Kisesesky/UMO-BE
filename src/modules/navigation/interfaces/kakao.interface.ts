export interface KakaoPlaceSearchResult {
  documents: Array<{
    id: string;
    place_name: string;
    category_name: string;
    category_group_code: string;
    category_group_name: string;
    phone: string;
    address_name: string;
    road_address_name: string;
    x: string;
    y: string;
    place_url: string;
    distance: string;
  }>;
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: {
      region: string[];
      keyword: string;
      selected_region: string;
    };
    total_count: number;
  };
}

export interface KakaoAddressSearchResult {
  documents: Array<{
    address: {
      address_name: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      mountain_yn: string;
      main_address_no: string;
      sub_address_no: string;
    };
    address_name: string;
    address_type: string;
    x: string;
    y: string;
  }>;
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

export interface KakaoDirectionsResult {
  trans_id: string;
  routes: Array<{
    result_code: number;
    result_msg: string;
    summary: {
      origin: {
        name: string;
        x: number;
        y: number;
      };
      destination: {
        name: string;
        x: number;
        y: number;
      };
      fare: {
        taxi: number;
        toll: number;
      };
      distance: number;
      duration: number;
    };
    sections: Array<{
      distance: number;
      duration: number;
      roads: Array<{
        name: string;
        distance: number;
        duration: number;
        traffic_speed: number;
        traffic_state: number;
      }>;
    }>;
  }>;
}
