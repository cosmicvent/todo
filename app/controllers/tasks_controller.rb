class TasksController < ApplicationController

  def index
    @tasks = Task.all
  end

  def create
    @task = Task.create(params[:task])
    redirect_to root_path
  end
end
