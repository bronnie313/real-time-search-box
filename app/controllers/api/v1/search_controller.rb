class Api::V1::SearchController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
    end
    
    def create 
        search_query = params[:search_query]
        user_ip = request.remote_ip

        Search.create(search_query: search_query, user_ip: user_ip)
        render json: { message: 'Search query recorded successfuly' }, status: :created
    end

    def top_searches
        most_searched = Search.select("search_query, COUNT(*) as query_count").group(:search_query).order("query_count DESC").limit(5)
        render json: { top_searches: most_searched }, status: :ok
      end
end

