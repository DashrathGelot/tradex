Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "/favorites", to: "favorites#show"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      post "/signup", to: "users#create"
      get "/user", to: "users#show"
    end
  end
end
