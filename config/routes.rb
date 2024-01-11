Rails.application.routes.draw do
  root 'api/v1/search#index'

  namespace :api do
    namespace :v1 do
      resources :search, only: [:index, :create]
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
# config/routes.rb

