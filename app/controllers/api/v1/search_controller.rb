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
end
