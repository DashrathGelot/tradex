Rails.application.routes.draw do
  get "/user/:id", to: "user#show"

end
