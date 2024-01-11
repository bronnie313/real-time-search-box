class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index; end

  def create
    search_query = params[:search_query]
    user_ip = request.remote_ip

    Search.create(search_query:, user_ip:)
    render json: { message: 'Search query recorded successfuly' }, status: :created
  end

  def top_searches
    most_searched = Search.select('search_query, COUNT(*) as query_count').group(:search_query).order('query_count DESC').limit(5)
    render json: { top_searches: most_searched }, status: :ok
  end

  def suggestions
    suggest_query = params[:suggest_query]

    if suggest_query.present?
      suggestions = Search.where('search_query ILIKE ?', "%#{suggest_query}%").distinct.limit(5).pluck(:search_query)
      render json: { suggestions: }, status: :ok
    else
      render json: { error: 'Missing suggest_query parameter' }, status: :bad_request
    end
  end

  def recent_searches
    recent_searches = Search.order('created_at DESC').limit(5)
    render json: { recent_searches: }, status: :ok
  end
end
