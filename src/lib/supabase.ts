export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      booklinks: {
        Row: {
          book_id: number | null
          id: number
          label: string
          link: string | null
        }
        Insert: {
          book_id?: number | null
          id?: number
          label: string
          link?: string | null
        }
        Update: {
          book_id?: number | null
          id?: number
          label?: string
          link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_booklinks_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          active: boolean | null
          desc: string | null
          fts: unknown | null
          id: number
          img: string[] | null
          link: string | null
          title: string | null
          voucher: string | null
        }
        Insert: {
          active?: boolean | null
          desc?: string | null
          fts?: unknown | null
          id: number
          img?: string[] | null
          link?: string | null
          title?: string | null
          voucher?: string | null
        }
        Update: {
          active?: boolean | null
          desc?: string | null
          fts?: unknown | null
          id?: number
          img?: string[] | null
          link?: string | null
          title?: string | null
          voucher?: string | null
        }
        Relationships: []
      }
      books_categories: {
        Row: {
          book_id: number | null
          category_id: number | null
          id: number
        }
        Insert: {
          book_id?: number | null
          category_id?: number | null
          id?: number
        }
        Update: {
          book_id?: number | null
          category_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_books_categories_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_CategoryBookRelation_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      books_hashtags: {
        Row: {
          book_id: number | null
          hashtag_id: number | null
        }
        Insert: {
          book_id?: number | null
          hashtag_id?: number | null
        }
        Update: {
          book_id?: number | null
          hashtag_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_HashtagBookRelation_bookid_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_HashtagBookRelation_hashtagid_fkey"
            columns: ["hashtag_id"]
            isOneToOne: false
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      hashtags: {
        Row: {
          id: number
          tag: string | null
        }
        Insert: {
          id?: number
          tag?: string | null
        }
        Update: {
          id?: number
          tag?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          description: string | null
          fts: unknown | null
          id: string
          image: string | null
          link: string | null
          name: string | null
          price: number | null
        }
        Insert: {
          description?: string | null
          fts?: unknown | null
          id: string
          image?: string | null
          link?: string | null
          name?: string | null
          price?: number | null
        }
        Update: {
          description?: string | null
          fts?: unknown | null
          id?: string
          image?: string | null
          link?: string | null
          name?: string | null
          price?: number | null
        }
        Relationships: []
      }
      products_categories: {
        Row: {
          category_id: number | null
          id: number
          product_id: string | null
        }
        Insert: {
          category_id?: number | null
          id?: number
          product_id?: string | null
        }
        Update: {
          category_id?: number | null
          id?: number
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_products_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_products_categories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_products_categories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productscategoryview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_products_categories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productswithcategory"
            referencedColumns: ["id"]
          },
        ]
      }
      products_hashtags: {
        Row: {
          hashtag_id: number
          product_id: string
        }
        Insert: {
          hashtag_id: number
          product_id: string
        }
        Update: {
          hashtag_id?: number
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_products_hashtags_hashtag_id_fkey"
            columns: ["hashtag_id"]
            isOneToOne: false
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_products_hashtags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_products_hashtags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productscategoryview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_products_hashtags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productswithcategory"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          complete: boolean | null
          created_at: string
          id: string
          title: string | null
        }
        Insert: {
          complete?: boolean | null
          created_at?: string
          id?: string
          title?: string | null
        }
        Update: {
          complete?: boolean | null
          created_at?: string
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      users_teams: {
        Row: {
          team_id: number
          user_id: number
        }
        Insert: {
          team_id: number
          user_id: number
        }
        Update: {
          team_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_teams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      booksellers: {
        Row: {
          label: string | null
          link: string | null
          title: string | null
        }
        Relationships: []
      }
      hashtags_qty_view: {
        Row: {
          anzahl: number | null
          hashtag_id: number | null
          tag: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_products_hashtags_hashtag_id_fkey"
            columns: ["hashtag_id"]
            isOneToOne: false
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
        ]
      }
      productcategories: {
        Row: {
          category_id: number | null
          name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_products_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      productscategoryview: {
        Row: {
          category_id: number | null
          id: string | null
          name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_products_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      productshashtagsviews: {
        Row: {
          hashtag_id: number | null
          name: string | null
          product_id: string | null
          tag: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_products_hashtags_hashtag_id_fkey"
            columns: ["hashtag_id"]
            isOneToOne: false
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_products_hashtags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_products_hashtags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productscategoryview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_products_hashtags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productswithcategory"
            referencedColumns: ["id"]
          },
        ]
      }
      productswithcategory: {
        Row: {
          category_id: number | null
          id: string | null
          image: string | null
          name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_products_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

