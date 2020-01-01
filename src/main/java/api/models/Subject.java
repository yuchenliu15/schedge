package api.models;

import javax.validation.constraints.NotNull;
import java.util.List;

public class Subject {
  private String code;
  private List<Course> courses;

  public Subject(String code, List<Course> courses) {
    this.code = code;
    this.courses = courses;
  }

  public @NotNull String getCode() { return code; }

  public @NotNull List<Course> getCourses() { return courses; }
}