Rails.application.routes.draw do
  root to: "application#cookie"
  namespace :api do
    namespace :v1 do
      get "/favorites", to: "favorites#show"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      post "/signup", to: "users#signup"
      get "/user", to: "users#show"
    end
  end
end
